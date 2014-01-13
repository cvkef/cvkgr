<?php
    
    // No Direct Access
    if ( !isset($_POST) || empty($_POST) || empty($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' )
    {
        header('Location: /');
        exit();
    } 
    
    // PHPMailer
    require('phpmailer/class.phpmailer.php');

    // Email Configuration
    $mail_host = 'ssl://mail.cvk.gr';
    $mail_port = 465;
    $mail_user = 'valantis@cvk.gr';
    $mail_pass = 'v@l@nt15';
    $mail_name = 'Chrisovalantis Kefalidis';
    $mail_from = 'valantis@cvk.gr';

    //
    $name   = stripcslashes($_POST['name']);
    $email  = stripcslashes($_POST['email']);
    $msg    = stripcslashes($_POST['message']);


    //
    $mail = new PHPMailer();  
    $mail->IsSMTP();
    $mail->Mailer   = "smtp";
    $mail->Host     = $mail_host;
    $mail->Port     = $mail_port;
    $mail->SMTPAuth = true;
    $mail->Username = $mail_user;
    $mail->Password = $mail_pass;
    
    $mail->FromName = $mail_name;
    $mail->From     = $mail_from;
    $mail->AddAddress($email, $name);
    $mail->AddCC($mail_from, $mail_name);

    $mail->Subject  = '[CvK] This is a copy of your message';
    $mail->WordWrap = 70;
    $mail->ContentType = 'text/html';

    // Email Body
    $message = <<<EOM
<html>
    <head>

    </head>
    <body>
        <h1>Thankk you {$name}!</h1>
        <p>I got your message and I'll do my best to respond as soon as possible.</p>
        
        <p>Until then, feel free to get in touch in me around hereL:</p>
        <ul>
            <li><a class="social-btn social-btn-facebook" href="https://www.facebook.com/CvKef" target="_blank">Facebook</a></li>
            <li><a class="social-btn social-btn-twitter" href="https://twitter.com/cvkef" target="_blank">Twitter</a></li>
            <li><a class="social-btn social-btn-google-plus" href="https://plus.google.com/115371979917037745775/" target="_blank">Google+</a></li>
            <li><a class="social-btn social-btn-skype" href="skype:cv_kef?call" target="_blank">Skype</a></li>
            <li><a class="social-btn social-btn-linkedin" href="http://www.linkedin.com/in/cvkef" target="_blank">LinkedIn</a></li>
            <li><a class="social-btn social-btn-github" href="https://github.com/cvkef" target="_blank">GitHub</a></li>
        </ul>
        
        <p>Here is a copy of your original message</p>
        <p>{$msg}</p>

        <p>Thanks,</p>
        <p>{$mail_name}</p>
    </body>
</html>
EOM;

    $mail->Body = $message;

    if ( !$mail->Send() )
    {
      echo 'error';
    }
    else
    {
      echo 'success';
    }

?>