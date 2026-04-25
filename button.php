<?php
  if (isset($_POST['nama']) && isset($_POST['email']) && isset($_POST['pesan'])) {
    $nama = trim($_POST['nama']);
    $email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
    $pesan = trim($_POST['pesan']);

    $to = 'muhamadrizkanharinfaza@gmail.com';
    $subject = 'Form Kontak Dari '.$nama;
    $message = 'Nama: '.$nama."\n".'Email: '.$email."\n".'Pesan: '.$pesan;
    $safeFrom = str_replace(array("\r", "\n"), '', (string)$email);
    $headers = 'From: '.$safeFrom;

    if (!$email) {
      echo 'Email tidak valid.';
    } elseif (mail($to, $subject, $message, $headers)) {
      echo 'Email berhasil dikirim.';
    } else {
      echo 'Email gagal dikirim.';
    }
  }
?>
