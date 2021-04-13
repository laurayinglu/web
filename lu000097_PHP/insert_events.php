<?php
error_reporting(E_ALL);
ini_set( 'display_errors','1');
include_once 'database.php';
$con=new mysqli($db_servername, $db_username, $db_password, $db_name);
// Check connection
if (mysqli_connect_errno())
  {
  echo 'Failed to connect to MySQL:' . mysqli_connect_error();
  }

$sql1 = "INSERT INTO tbl_events (event_day, event_event, event_start, event_end,
            event_location, event_phone, event_info, event_url) VALUES ('Sunday','Jog', '11:00 AM', '12:00 AM', '1801 6th St SE, Minneapolis, MN 55455', '(612)625-4002', 'Info on where I am Jogging',
           'https://www.google.com/maps/place/University+of+Minnesota+Track+%26+Field+Stadium/@44.9814117,-93.2272704,15z/data=!4m5!3m4!1s0x0:0xd101ef8600ae63fb!8m2!3d44.9814117!4d-93.2272704');";

mysqli_query($con,$sql1);
echo "Row 1 inserted<br>";

$sql2 = "INSERT INTO tbl_events (event_day, event_event, event_start, event_end,
          event_location, event_phone, event_info, event_url) VALUES ('Monday','Csci 4131 Lecture', '09:45 AM', '11:00 AM', 'Virtual (Zoom)', '(612)625-4002', 'Ccsi 4131 Info',
         'https://onestop2.umn.edu/pcas/viewCatalogCourse.do?courseId=790654');";

mysqli_query($con,$sql2);
echo "Row 2 inserted<br>";

$sql3 = "INSERT INTO tbl_events (event_day, event_event, event_start, event_end,
          event_location, event_phone, event_info, event_url) VALUES ('Tuesday','Lunch', '12:00 AM', '01:00 PM', 'Blue Door Pub (Como Ave)', '(612)625-4003', 'Blue Door Pub',
          'https://www.google.com/maps/place/Blue+Door+Pub+University/@44.987642,-93.2319058,17z/data=!4m13!1m7!3m6!1s0x52b32d067b5b1d95:0xee88dc4ea05b2361!2s1514+Como+Ave+SE,+Minneapolis,+MN+55414!3b1!8m2!3d44.987608!4d-93.2297234!3m4!1s0x52b32d067c9e1729:0x37b768c113d903e3!8m2!3d44.987642!4d-93.2297118');";


mysqli_query($con,$sql3);
echo "Row 3 inserted<br>";


$sql4 = "INSERT INTO tbl_events (event_day, event_event, event_start, event_end,
          event_location, event_phone, event_info, event_url) VALUES ('Friday','Csci 2081 Lecture', '01:25 PM', '02:15 PM', 'Virtual (Zoom)', '(612)625-4002', 'Ccsi 2081 Info',
         'https://www.coursicle.com/umn/courses/CSCI/2081/');";

mysqli_query($con,$sql4);
echo "Row 4 inserted<br>";

$sql5 = "INSERT INTO tbl_events (event_day, event_event, event_start, event_end,
          event_location, event_phone, event_info, event_url) VALUES ('Thursday','Walk Dog', '07:30 AM', '9:00 AM', '901 15th Ave SE, Minneapolis, MN 55414', '(612) 370-4926', 'Dog Walk Info',
         'https://www.minneapolisparks.org/parks__destinations/parks__lakes/van_cleve_park/');";

mysqli_query($con,$sql5);
echo "Row 5 inserted<br>";

echo '<h1> Successfully Inserted Values into the Table </h1>'
?>
