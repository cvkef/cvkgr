<?php

    // No Direct Access
    if ( !isset($_POST) || empty($_POST) )
    {
        header('Location: /');
        exit();
    }

    // AJAX calls only please
    if ( isset($_SERVER['HTTP_X_REQUESTED_WITH']) && (strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest') )
    {
        header('Location: /');
        exit();
    }
    
    // PHPMailer
    require('./phpmailer/class.phpmailer.php');

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

    if ( (strlen($name) < 2) || !filter_var($email, FILTER_VALIDATE_EMAIL) || (strlen($msg) < 2) )
    {
        echo json_encode( array('status' => 'error', 'textMessage' => 'invalid_data') );
        exit();
    }

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
        <style type='text/css'>
            html{
                color:#444444;
                background-color:#f0f0f0;
            }
            body{
                font-family: "Segoe UI", "Helvetica", sans-serif;
                font-size:14px;
                line-height:1.428571429;
                color:#444444;
                background-color:#f0f0f0;
            }
            a{
                color: #3b5998;
                text-decoration: none;
            }
            a:hover{
                color: #263961;
                text-decoration: underline;
            }
            h1,h2,h3{
                font-weight: 300;
            }
            h1 span.strong{
                font-weight: 700;
            }
            hr{
                width: 99%;
                margin: 15px auto;
                border: 0 none;
                border-bottom: 1px solid #f0f0f0;
            }
            .content{
                width: 90%;
                max-width: 768px;
                margin: 0 auto;
                padding: 10px;
                box-shadow: 0 0 5px rgba(0,0,0,0.2);
                background-color: #ffffff;
                border: 1px solid #b1b4bf;
            }
            .pre{
                width: 90%;
                margin: 0 auto;
                padding: 5px;
                background-color: #f0f0f0;
                border: 1px dotted #c0c0c0;
            }
            .footer{
                width: 90%;
                max-width: 768px;
                margin: 0 auto;
                padding: 5px 10px;
                font-size: 11px;
                color: #808080;
            }
        </style>
    </head>
    <body>
        <div class="content">
            <h1>Thank you <span class="strong">{$name}</span>!</h1>
            <p>I got your message and I'll do my best to respond to you as soon as possible.</p>
            
            <hr/>

            <p>Until then, feel free to get in touch with me around here:</p>
            <ul>
                <li><a class="social-btn social-btn-facebook" href="https://www.facebook.com/CvKef" target="_blank">Facebook</a></li>
                <li><a class="social-btn social-btn-twitter" href="https://twitter.com/cvkef" target="_blank">Twitter</a></li>
                <li><a class="social-btn social-btn-google-plus" href="https://plus.google.com/115371979917037745775/" target="_blank">Google+</a></li>
                <li><a class="social-btn social-btn-skype" href="skype:cv_kef?call" target="_blank">Skype</a></li>
                <li><a class="social-btn social-btn-linkedin" href="http://www.linkedin.com/in/cvkef" target="_blank">LinkedIn</a></li>
                <li><a class="social-btn social-btn-github" href="https://github.com/cvkef" target="_blank">GitHub</a></li>
            </ul>
            
            <hr/>

            <h2>Here is a copy of your original message</h2>
            <div class="pre">{$msg}</div>
            
            <hr/>

            <p>Thanks,</p>
            <p>- {$mail_name}</p>
        </div>
        <div class="footer">
            <p>Copyright Chrisovalantis Kefalidis | <a href="http://www.cvk.gr/">www.cvk.gr</a>. All rights reserved.</p>
        </div>
    </body>
</html>
EOM;

    $mail->Body = $message;

    if ( !$mail->Send() )
    {
      echo json_encode( array('status' => 'error', 'textMessage' => 'message_not_delivered') );
    }
    else
    {
      echo json_encode( array('status' => 'success', 'textMessage' => 'message_delivered') );
    }

?>