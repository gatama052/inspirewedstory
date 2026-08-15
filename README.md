# Remix of Galium Aiktimal Wedding

Buat sebuah website undangan pernikahan digital premium, modern, elegan, romantis, dan mobile-first untuk pasangan Galium & Aiktimal.

Gunakan seluruh gambar dan file musik yang terlampir pada project ini sebagai asset utama. Jangan mengganti asset terlampir dengan gambar placeholder atau membuat ulang asset yang sudah tersedia. Background, ornamen pojok, foto pasangan, foto mempelai pria/wanita, dan musik terlampir harus digunakan sesuai fungsinya.





---



1. KONSEP UTAMA



Website harus terasa seperti interactive wedding invitation modern, bukan website artikel biasa.



Konsep navigasi wajib:



> 1 swipe = 1 halaman penuh.







Setiap halaman menggunakan tinggi:



100dvh



Jadi ketika user menggeser:



SWIPE UP

Halaman 1

↓

TRANSISI

↓

Halaman 2



dan user juga harus bisa kembali:



SWIPE DOWN

Halaman 2

↓

TRANSISI

↓

Halaman 1



Jangan membuat navigasi satu arah.



User harus bebas:



swipe ke atas



swipe ke bawah



klik navigation



kembali ke halaman sebelumnya



berpindah antarhalaman tanpa harus mengikuti urutan secara paksa.





Gunakan full-page vertical snap / controlled section navigation, bukan halaman panjang seperti artikel.



Pastikan swipe cepat tidak menyebabkan halaman meloncat dua atau tiga section sekaligus.





---



2. PRIORITAS ANIMASI



SEMUA ANIMASI WAJIB SMOOTH, HALUS, ELEGAN, DAN TIDAK TERASA KAKU.



Jangan menggunakan:



animasi terlalu cepat



bounce berlebihan



zoom berlebihan



efek flashy



transisi kasar



teks tiba-tiba muncul



elemen berpindah secara patah-patah.





Gunakan:



opacity



transform



translate



scale kecil



blur sangat ringan bila diperlukan



cubic-bezier



staggered animation



smooth page transition.





Animasi harus terasa seperti premium wedding website, bukan animasi template biasa.



Gunakan durasi sekitar 500–900ms untuk entrance/exit utama dan stagger sekitar 80–180ms antar elemen.



Hormati prefers-reduced-motion untuk accessibility.





---



3. SISTEM TRANSISI HALAMAN



Ketika user berpindah halaman ke atas:



Halaman lama:



Content fade out perlahan.



Text bergerak sedikit ke arah atas.



Foto bergerak sedikit ke arah atas.



Ornamen fade out.



Background melakukan crossfade lembut.





Halaman baru:



Background muncul perlahan.



Ornamen muncul kembali.



Text masuk dengan fade + slight translate.



Foto masuk dengan fade + slight scale.



Button muncul terakhir.



Setiap elemen memiliki stagger yang halus.





Ketika user swipe ke bawah, animasinya harus menyesuaikan arah:



Swipe Up:

old page → sedikit ke atas

new page → masuk dari bawah



Swipe Down:

old page → sedikit ke bawah

new page → masuk dari atas



Jangan menggunakan satu animasi yang sama untuk kedua arah.





---



4. ORNAMEN



Gunakan asset ornamen yang terlampir:



Top Left Ornament

Top Right Ornament

Bottom Left Ornament

Bottom Right Ornament



Jangan menyatukan ornamen dengan background.



Ornamen harus menjadi layer terpisah sehingga bisa dianimasikan.



Top Left



Entrance:



opacity: 0 → 1

translateX: -20px → 0



Exit ke atas:



opacity: 1 → 0

translateX: -10px

translateY: -20px



Exit ke bawah:



opacity: 1 → 0

translateX: -10px

translateY: 20px



Top Right



Entrance:



opacity: 0 → 1

translateX: 20px → 0



Exit ke atas:



opacity: 1 → 0

translateX: 10px

translateY: -20px



Exit ke bawah:



opacity: 1 → 0

translateX: 10px

translateY: 20px



Bottom Left



Entrance:



opacity: 0 → 1

translateY: 25px → 0



Exit mengikuti arah halaman.



Bottom Right



Entrance:



opacity: 0 → 1

translateY: 25px → 0



Exit mengikuti arah halaman.



Setiap kali halaman aktif berubah, animation state harus di-reset, sehingga ornamen melakukan entrance animation kembali.





---



5. BACKGROUND



Gunakan background utama yang terlampir.



Jangan mengganti background dengan gradient generik.



Background harus:



memenuhi layar



tetap proporsional



tidak terdistorsi



tidak menutupi teks



responsive pada berbagai ukuran smartphone.





Gunakan background sebagai layer tersendiri.





---



6. OPENING



Buat halaman opening yang sangat premium.



Konten:



UNDANGAN PERNIKAHAN



Galium

&

Aiktimal



Kepada Yth.

Bapak/Ibu/Saudara/i



[Nama Tamu]



[ BUKA UNDANGAN ]



Nama:



Galium & Aiktimal



Nama tamu harus otomatis berubah berdasarkan personal invitation link.



Contoh:



Kepada Yth.

Bapak/Ibu/Saudara/i



Arsy





---



7. MUSIK



Gunakan file musik yang terlampir.



Musik tidak boleh mencoba autoplay sebelum user berinteraksi.



Saat user menekan:



BUKA UNDANGAN



maka:



1. Opening transition berjalan.





2. Musik mulai dimainkan.





3. Musik terus berjalan ketika user berpindah halaman.





4. Musik tidak restart setiap pindah halaman.





5. Tambahkan floating music button.





6. User dapat mute/unmute musik.





7. Status musik tetap konsisten selama navigasi.







Gunakan HTML5 Audio/Web Audio sesuai kebutuhan browser.





---



8. HALAMAN SALAM



Tampilkan:



Bismillahirrahmanirrahim



Assalamu'alaikum Wr. Wb.



Dengan memohon rahmat dan ridho Allah SWT,

kami bermaksud mengundang Bapak/Ibu/Saudara/i

untuk hadir dalam acara pernikahan kami.



Gunakan typography serif elegan dengan script hanya sebagai aksen.



Animasi:



heading fade + slight upward movement



paragraph fade setelah heading



decorative element masuk terakhir.







---



9. HALAMAN Ayat Al-Qur'an



Buat halaman quote yang minimalis.



Gunakan quote pernikahan Islami yang relevan dan sopan.



Contoh:

وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً ۗاِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ

> “Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir." (QS. Ar-Rum: 21)



Jangan membuat teks terlalu kecil.





---



10. HALAMAN MEMPELAI



Gunakan foto mempelai pria dan wanita yang terlampir.



Nama:



Galium



Putra dari

Bapak Ahmad Pratama & Ibu Nur Aisyah



&



Aiktimal



Putri dari

Bapak Muhammad Fadli & Ibu Siti Rahma



Gunakan layout formal, sopan, dan modern.



Foto tidak boleh terpotong secara aneh.



Animasi:



Foto:

opacity 0 → 1

scale 0.96 → 1



Nama:

fade + translateY



Nama orang tua:

fade + translateY



Jangan menggunakan efek berlebihan.





---



11. HALAMAN AKAD NIKAH



Gunakan informasi dummy berikut:



AKAD NIKAH



SABTU

15

AGUSTUS 2026



08.00 WIB



Lokasi Acara



Masjid Al-Hikmah



Jl. Melati Raya No. 12,

Kecamatan Sukamaju,

Kabupaten Kediri,

Jawa Timur



[ PETUNJUK KE LOKASI ]



Button Maps harus benar-benar bisa diklik.



Gunakan Google Maps URL yang dapat diganti melalui konfigurasi.



Desain:



formal



elegant



frame tipis



typography premium



whitespace cukup.







---



12. HALAMAN RESEPSI



RESEPSI



SABTU

15

AGUSTUS 2026



10.00 – 20.00 WIB



Lokasi Acara



Kediaman Mempelai Wanita



Jl. Melati Raya No. 12,

Kecamatan Sukamaju,

Kabupaten Kediri,

Jawa Timur



[ PETUNJUK KE LOKASI ]



Buat desain berbeda sedikit dari halaman Akad tetapi tetap satu visual identity.





---



13. MAPS



Maps wajib tersedia untuk:



Akad



Resepsi





Gunakan:



alamat



map preview bila memungkinkan



tombol Petunjuk ke Lokasi



tombol membuka Google Maps.





Jangan membuat Maps sebagai section artikel panjang.





---



14. COUNTDOWN



Buat countdown realtime menuju:



15 Agustus 2026



Tampilan:



MENUJU HARI BAHAGIA



00        00        00        00

HARI      JAM       MENIT     DETIK



Gunakan card minimalis.



Ketika halaman dibuka:



heading fade



countdown cards muncul staggered



angka memiliki perubahan yang smooth.







---



15. GALERI



Gunakan foto yang tersedia/terlampir jika ada.



Buat galeri seperti editorial:



┌─────────────────────┐

│                     │

│       FOTO          │

│                     │

│                     │

└─────────────────────┘



01 / 06



Gunakan:



fade



slight scale



smooth transition.





Jangan membuat grid yang terlalu ramai.





---



16. LOVE STORY



Buat timeline:



THE BEGINNING

Pertama Bertemu



THE JOURNEY

Mulai Mengenal



THE PROMISE

Memutuskan Bersama



THE DAY

Hari Pernikahan



Setiap item muncul dengan staggered animation.





---



17. GIFT / QRIS



Gunakan konsep hadiah digital menggunakan QRIS.



Tampilan:



KIRIM HADIAH



Doa dan restu Anda

adalah hadiah terindah bagi kami.



[ QRIS ]



[ LIHAT QRIS ]



QRIS harus dapat diperbesar dalam modal.



Modal:



fade background



card scale 0.96 → 1



close button



QRIS jelas.







---



18. RSVP



Buat form:



KONFIRMASI KEHADIRAN



Nama

[................]



Kehadiran

[ Hadir ]

[ Tidak Hadir ]

[ Masih Ragu ]



Jumlah Tamu

[ 1 ]



Ucapan

[................]



[ KIRIM ]



Setelah submit:



✓ Terima kasih



Konfirmasi dan ucapan Anda

telah berhasil dikirim.



Data disimpan ke database.





---



19. PERSONALIZED GUEST INVITATION



Ini WAJIB.



Sistem harus mendukung banyak tamu dalam satu undangan.



Client tidak membuat undangan baru untuk setiap tamu.



Contoh:



Undangan Galium & Aiktimal

        │

        ├── yoga pratama

        ├── Budi harianto

        ├── Siti

        └── Andi



Setiap tamu memiliki unique invitation code.



Contoh:



Inspirewebcraft.com/galium-aiktimal/A7K29

Inspirewebcraft.com/galium-aiktimal/X82PL

Inspirewebcraft.com/galium-aiktimal/M51QW



Jangan menggunakan nama tamu langsung sebagai identifier URL.



Sistem membaca kode tersebut dan mengambil nama dari database.



Jika kode:



A7K29



adalah milik Yoga pratama, maka opening otomatis:



Kepada Yth.

Bapak/Ibu/Saudara/i



Yoga pratama



Jika Budi harianto membuka link miliknya:



Kepada Yth.

Bapak/Ibu/Saudara/i



Budi Harianto





---



20. DASHBOARD CLIENT



Client memiliki dashboard, tetapi dashboard tidak boleh terlihat oleh tamu biasa.



Tidak ada tombol Login yang mencolok di halaman undangan.



Untuk masuk:



ketuk area pojok kanan atas sebanyak 3 kali.



Setelah 3 kali tap:



AKSES PEMILIK UNDANGAN



Email

Password



[ MASUK ]



Email : pratama0909@gmail.com

Pasword : Undangan0909@



Password dibuat oleh pengelola platform dan diberikan kepada client.





---



21. DASHBOARD



Setelah login:



GALIUM & AIKTIMAL

Wedding Dashboard



Menu:



Overview

Data Tamu

RSVP

Ucapan



Overview



TOTAL TAMU

100



HADIR

72



TIDAK HADIR

18



BELUM KONFIRMASI

10



Data Tamu



Client dapat:



tambah tamu



edit nama tamu



hapus tamu



copy personal link



bagikan personal link



melihat status RSVP.





Contoh:



Nama	Personal Link	RSVP



Yoga pratama	Copy Link	Hadir

Budi harianto	Copy Link	Belum

Siti	Copy Link	Tidak Hadir





Ketika client menambahkan:



Nama Tamu:

Yoga pratama



[ TAMBAH TAMU ]



sistem otomatis:



1. membuat unique code





2. menyimpan nama + code





3. membuat personal invitation URL





4. menampilkan link pada tabel.









---



22. RSVP CLIENT



Client dapat melihat:



Total Respons

Hadir

Tidak Hadir

Masih Ragu

Belum Konfirmasi



Setiap respons harus terhubung dengan tamu berdasarkan personal invitation code.



Contoh:



Yoga pratama

Hadir

2 orang

10:32



Budi harianto

Tidak Hadir

0 orang

11:04





---



23. UCAPAN



Tampilkan:



Yoga pratama



“Semoga menjadi keluarga

yang bahagia dan penuh berkah.”



15 Aug 2026 • 10:32



Data ucapan juga harus terhubung dengan tamu.





---



24. LOGOUT



Di dashboard:



[ KELUAR ]



Setelah logout:



session dihapus dengan aman.



user kembali ke halaman undangan.



dashboard tidak dapat diakses tanpa login lagi.







---



25. KEAMANAN DATA



Gunakan authentication dan database permission yang benar.



Client hanya boleh melihat:



data undangan miliknya sendiri.



Jangan hanya menyembunyikan data menggunakan frontend.



Gunakan backend/database authorization seperti Supabase Row Level Security bila menggunakan Supabase.





---



26. BOTTOM NAVIGATION



Buat navigation minimalis di bagian bawah.



Contoh:



Opening

Salam

Quotes

Mempelai

Akad

Resepsi

RSVP



Active page mempunyai visual berbeda.



Navigation harus:



fixed



tidak menutupi konten



aman pada Android/iOS safe area



bisa digunakan untuk berpindah langsung ke halaman tertentu.





Saat navigation diklik, tetap jalankan page transition yang sama.





---



27. RESPONSIVE



Prioritas utama:



Android smartphone.



Tetapi harus tetap bagus pada:



iPhone



tablet



desktop.





Gunakan:



100dvh

safe-area-inset

responsive typography

responsive spacing



Jangan sampai:



teks terpotong



tombol keluar layar



foto terpotong



ornamen menutupi teks



navigation menutupi konten.







---



28. STRUKTUR ASSET



Gunakan asset terlampir dan pisahkan:



/assets

    /background

    /ornaments

    /couple

    /bride

    /groom

    /gallery

    /music



WAJIB menggunakan file gambar dan musik terlampir.



Jangan mengganti asset dengan placeholder jika file tersedia.





---



29. KOMPONEN



Gunakan komponen reusable:



InvitationPage

PageTransition

OrnamentLayer

BackgroundLayer

MusicPlayer

BottomNavigation

Opening

Greeting

Quote

CoupleSection

EventSection

MapsButton

Countdown

Gallery

LoveStory

GiftSection

QRISModal

RSVPForm

GuestMessages

OwnerLogin

OwnerDashboard

GuestManager

RSVPManager





---



30. TEKNOLOGI



Gunakan:



React



Vite



CSS/Tailwind



Supabase untuk authentication/database/storage bila diperlukan.





Jangan menggunakan TanStack Start.



Buat struktur kode yang rapi dan mudah dikembangkan.





---



31. ATURAN PALING PENTING



Pastikan hasil akhir memenuhi semua ini:



1. Fullscreen page-by-page.

2. 1 swipe = 1 halaman.

3. Bisa swipe ke atas DAN ke bawah.

4. Tidak boleh seperti membaca artikel panjang.

5. Semua transisi sangat smooth.

6. Animasi teks, foto, button, background, dan ornamen harus halus.

7. Ornamen melakukan fade-out ketika meninggalkan halaman dan fade-in kembali ketika halaman baru aktif.

8. Animasi harus berbeda arah berdasarkan swipe up/down.

9. Musik terlampir mulai ketika user menekan Buka Undangan.

10. Musik tidak restart ketika pindah halaman.

11. Maps tersedia untuk Akad dan Resepsi.

12. QRIS tersedia untuk Gift.

13. RSVP tersimpan.

14. Ucapan tersimpan.

15. Setiap tamu dapat memiliki personal invitation link.

16. Nama tamu otomatis muncul berdasarkan unique invitation code.

17. Client dapat menambahkan daftar tamu dari dashboard.

18. Sistem otomatis membuat link personal setiap kali tamu ditambahkan.

19. Client dapat melihat RSVP dan ucapan.

20. Dashboard hanya bisa dibuka melalui 3x tap pojok kanan atas → Login.

21. Client memiliki email dan password sendiri.

22. Client hanya dapat melihat data undangannya sendiri.

23. Tidak ada masa aktif/kedaluwarsa undangan.

24. Gunakan nama mempelai Galium & Aiktimal.

25. Gunakan gambar dan musik yang terlampir sebagai asset utama.

26. Jangan membuat desain yang terlihat seperti website artikel atau template wedding biasa.

27. Hasil akhir harus terasa seperti premium interactive wedding invitation yang modern, elegan, clean, dan sangat smooth.dan ada lazyload jangan patah2 pas baru bukanya

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://inspirewedstory.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/78956e13-91f2-40e9-bc68-9302bd3b5e86).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
