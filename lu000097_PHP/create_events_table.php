<?php
// $con= mysqli_connect('localhost','root','','phpDB','3306');
include_once 'database.php';
$con=new mysqli($db_servername, $db_username, $db_password, $db_name);
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

// Create table
$sql="CREATE TABLE tbl_events(event_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                         event_day VARCHAR(30),
                                         event_event VARCHAR(300),
                                         event_start VARCHAR(30),
                                         event_end VARCHAR(30),
                                         event_location VARCHAR(1024),
                                         event_phone VARCHAR(30),
                                         event_info VARCHAR(1024),
                                         event_url VARCHAR(1024)) ";

// Execute query
if (mysqli_query($con,$sql))
  {
  echo "<h1> Table tbl_contacts created successfully </h1>";
  }
else
  {
  echo "<h1> Error creating table: <h1>" . mysqli_error($con);
  }

mysqli_close($con);

?>
