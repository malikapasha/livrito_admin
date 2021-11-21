<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="description" content="">
    <meta name="keywords" content="thema bootstrap template, thema admin, bootstrap, admin template, bootstrap admin">

    <meta name="author" content="LanceCoder">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <link rel="shortcut icon" href="">
    <title>School Management System</title>
	<link href="assets/font-awesome/css/font-awesome.css" rel="stylesheet" />

    <!-- Start Global plugin css -->
    <link href="assets/css/global-plugins.css" rel="stylesheet">
   
    <!-- End Global plugin css -->


    <!-- Custom styles for this template -->
    <link href="assets/css/theme.css" rel="stylesheet">
    <link href="assets/css/style-responsive.css" rel="stylesheet"/>
    <link href="assets/css/class-helpers.css" rel="stylesheet"/>

    <!--Color schemes-->
    <link href="assets/css/colors/green.css" rel="stylesheet">

    <!--Fonts-->
    <link href="assets/fonts/Indie-Flower/indie-flower.css" rel="stylesheet" />
    <link href="assets/fonts/Open-Sans/5f0dcaa0e4aad4d9473a87378b32e8a1.css" rel="stylesheet" />

   
</head>
<body id="default-scheme">

    <!--main content start-->
    <section class="page-error">

        <div class="row">
            <div class="col-md-12">
               <div class="error_page">
        
                    <strong>404</strong>
                    <br>
                    <b>Page not found!</b>
                    
                    <em>Sorry, the page you were looking for could not be found!</em>

                    <p>Try using the button below to go to main page of the Dashboard</p>
                    
                    <div class="clearfix margin_top3"></div>
                    
                    <a href="index.php?page=home" class="btn btn-green btn-raised btn-flat"><i class="fa fa-arrow-circle-left fa-lg"></i>&nbsp; Go to Dashboard</a>
                    
                </div>
            </div>
            
        </div>

    </section>

   
    <script src="assets/js/global-plugins.js"></script>
    <!--common script init for all pages-->
    <script src="assets/js/theme.js" type="text/javascript" ></script>

    <script type="text/javascript">


        $(document).ready(function(){
            new WOW().init();

            App.initPage();
            App.initLeftSideBar();
            App.initCounter();
            App.initNiceScroll();
            App.initPanels();
            App.initProgressBar();
            App.initSlimScroll();
            App.initNotific8();
            App.initTooltipster();
            App.initStyleSwitcher();
            App.initMenuSelected();
            App.initRightSideBar();
            App.initSummernote();
            App.initAccordion();
            App.initModal();
            App.initPopover();

        });
    </script>


</body>

</html>

<!--===== Footer End ========-->