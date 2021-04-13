<!DOCTYPE html>

<html>
	<head> 
		<meta charset = "utf-8">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		<link rel = "stylesheet" href = "style.css">
	</head>
	<body>
		<nav class="navbar navbar-default">
	     	<div class="container-fluid">
		        <ul class="nav navbar-nav">
		          <li><a href="events.php"><b>Events Page</b></a></li>
		        </ul>

	    	</div>
	  	</nav>
    	<br><br>

    <div class="container">
      <table class="table" id="eventsTable">
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Event</th>
            <th scope="col">Time</th>
            <th scope="col">Event Location </th>
            <th scope="col">Phone Number</th>
            <th scope="col">Extra Info <br> (URL) </th>
          </tr>
        </thead>
        <tbody>
			<?php 
			ini_set('display_errors','1');
			error_reporting(E_ALL);
			//... PHP script that preceeds PHP script to include your MySQL database info
			//$select = $_POST["select"]; // column name
			$squery = 'SELECT * FROM tbl_events';

			if (!empty($_POST)) {
				$keyword = $_POST["keyword"];
				$select = $_POST["select"]; // column name
		
				// if no keyword enter
				if($keyword !== '') {
					// if ($select == "event_start") {
					// 	$select
					//$squery .= ' WHERE ' . $select . ' LIKE ' . '\'%'.$keyword.'%\'' ;
					
					$squery .= ' WHERE ' . $select . ' LIKE ' . '\'%'.$keyword.'%\'' ;
				}
			}


			include_once 'database.php';

			// create connection
			$conn = new mysqli($db_servername, $db_username, $db_password, $db_name, $db_port);
			if ($conn->connect_error) {
				// report error 
				echo die("Could not connect to database </body></html>");

			} else {
				// setup your query
				
				$result = $conn->query($squery);

				// if(!$result->num_rows) {
				// 	$result = $conn->query('SELECT * FROM tbl_events');
				// }
				if($result->num_rows) {
					//fetch each record in result set
					while($row = mysqli_fetch_row($result)) {
						print("<tr>");
						print("<td>$row[1]</td>");
						print("<td>$row[2]</td>");
						print("<td>$row[3] - $row[4]</td>");
						print("<td>$row[5]</td>");
						print("<td>$row[6]</td>");
						print("<td> <a href = $row[8]> $row[7]</a></td>");
						print("</tr>");
					}
				}

				$conn->close();
			}

			// .. PHP script that follows the PHP script used to connect to your MySQL database

			?>
		</tbody>
	</table>
	<form method = "post">
		<label> Column Name: </label>
		<select name = "select">
			<option value = "event_day">Day </option>
			<option value = "event_event">Event </option>
			<option value = "concat(event_start, event_end)">Start </option>
			<option value = "event_location">Location </option>
			<option value = "event_phone">Phone </option>
		</select><br>
		<label>Contains: </label><br>
		<input type="text" name="keyword" id = "kw" placeholder="Enter keyword"><br><br>
		<button type="submit" class = "btn btn-primary btn-block"> Filter</button>
	</form>
</div>
</body>
</html>


