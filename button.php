<?php
  if (isset($_POST['nama']) && isset($_POST['email']) && isset($_POST['pesan'])) {
    $nama = $_POST['nama'];
    $email = $_POST['email'];
    $pesan = $_POST['pesan'];

    $to = 'muhamadrizkanharinfaza@gmail.com';
    $subject = 'Form Kontak Dari '.$nama;
    $message = 'Nama: '.$nama."\n".'Email: '.$email."\n".'Pesan: '.$pesan;
    $headers = 'From: '.$email;

    if (!mail($email, $subject, $message, $headers)) {
      echo 'Email berhasil dikirim.';
    } else {
      echo 'Email gagal dikirim.';
    }
  }
?>
