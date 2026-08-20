import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const slugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(3)
  .max(60)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug hanya boleh huruf kecil, angka, dan tanda -");

const createSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8, "Kata sandi minimal 8 karakter"),
  groomName: z.string().trim().min(1).max(60),
  brideName: z.string().trim().min(1).max(60),
  slug: slugSchema,
  theme: z.string().trim().min(1).max(60).default("sage-romance"),
});

async function assertAdmin(context: { supabase: { rpc: Function }; userId: string }) {
  const { data } = await (context.supabase.rpc as (
    fn: string,
    args: Record<string, unknown>,
  ) => Promise<{ data: boolean | null }>)("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (!data) throw new Error("Forbidden");
}

/** Admin-only: creates the client's login account, client record and invitation. */
export const createClientAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => createSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as never);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const existingSlug = await supabaseAdmin
      .from("invitations")
      .select("id")
      .eq("slug", data.slug)
      .maybeSingle();
    if (existingSlug.data) throw new Error("Slug sudah digunakan. Silakan gunakan slug lain.");

    const created = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
    });
    if (created.error || !created.data.user) {
      throw new Error(created.error?.message ?? "Gagal membuat akun client");
    }
    const authUserId = created.data.user.id;
    const coupleName = `${data.groomName} & ${data.brideName}`;

    const client = await supabaseAdmin
      .from("clients")
      .insert({ auth_user_id: authUserId, name: coupleName, email: data.email })
      .select("id")
      .single();
    if (client.error) {
      await supabaseAdmin.auth.admin.deleteUser(authUserId);
      throw new Error(client.error.message);
    }

    const invitation = await supabaseAdmin
      .from("invitations")
      .insert({ client_id: client.data.id, slug: data.slug, theme: data.theme })
      .select("id")
      .single();
    if (invitation.error) {
      await supabaseAdmin.from("clients").delete().eq("id", client.data.id);
      await supabaseAdmin.auth.admin.deleteUser(authUserId);
      throw new Error(invitation.error.message);
    }

    await supabaseAdmin.from("invitation_content").insert({
      invitation_id: invitation.data.id,
      groom_name: data.groomName,
      groom_full_name: data.groomName,
      bride_name: data.brideName,
      bride_full_name: data.brideName,
    });

    return { clientId: client.data.id, invitationId: invitation.data.id, slug: data.slug };
  });

/** Admin-only: removes the client, its invitation data and its login account. */
export const deleteClientAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ clientId: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as never);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const client = await supabaseAdmin
      .from("clients")
      .select("auth_user_id")
      .eq("id", data.clientId)
      .maybeSingle();
    if (!client.data) throw new Error("Client tidak ditemukan");

    await supabaseAdmin.from("clients").delete().eq("id", data.clientId);
    await supabaseAdmin.auth.admin.deleteUser(client.data.auth_user_id);
    return { ok: true };
  });

/** Admin-only: resets the client's password. */
export const updateClientPassword = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ clientId: z.string().uuid(), password: z.string().min(8) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context as never);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const client = await supabaseAdmin
      .from("clients")
      .select("auth_user_id")
      .eq("id", data.clientId)
      .maybeSingle();
    if (!client.data) throw new Error("Client tidak ditemukan");
    const result = await supabaseAdmin.auth.admin.updateUserById(client.data.auth_user_id, {
      password: data.password,
    });
    if (result.error) throw new Error(result.error.message);
    return { ok: true };
  });
