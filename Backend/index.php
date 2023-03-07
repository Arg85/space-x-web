<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
$url = "https://api.spacexdata.com/v4/capsules";


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "POST":

        // Read the raw request body from the input stream
        $request_body_json = file_get_contents('php://input');

        // Decode the JSON request body into an associative array
        $request_body = json_decode($request_body_json, true);

        $data = [];
        if (!empty($request_body['type'])) {
            $data['type'] = $request_body['type'];
        }

        if (!empty($request_body['status'])) {

            $data['status'] = $request_body['status'];
        }

        if (!empty($request_body['launch'])) {
            $data['launches'] = $request_body['launch'];
        }
        if ($request_body['reset'] == 1) {
            $w = new stdClass();

            $request_body1 = array(
                'query' => $w,
                'options' => array("limit" => 30, 'page' => 1)


            );
        }

        if ($request_body['page'] == 1) {


            if (sizeof($data) == 0 && $request_body['limit'] != 30) {

                $w = new stdClass();

                $request_body1 = $w;


            } elseif (sizeof($data) != 0 && $request_body['limit'] < 30) {
                $request_body1 = array(
                    'query' => $data
                );
            }

        }

        if ($request_body['page'] > 1) {
            //  echo "halla ho";

            $request_body1 = array(
                'query' => $data,
                'options' => array("limit" => $request_body['limit'], 'page' => $request_body['page'])
            );

        }



        // Convert the $request_body array to a JSON string
        $request_body_json = json_encode($request_body1);

        // Convert the request body to a JSON string
        $json_data = json_encode($request_body1);




        // Set up the cURL request
        $curl = curl_init();
        curl_setopt_array(
            $curl,
            array(
                CURLOPT_URL => 'https://api.spacexdata.com/v4/capsules/query',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_POSTFIELDS => $json_data,
                CURLOPT_HTTPHEADER => array(
                    'Content-Type: application/json'
                ),
            )
        );
        // Execute the cURL request and get the response
        $response = curl_exec($curl);

        // Check for errors
        if (curl_errno($curl)) {
            echo 'Error: ' . curl_error($curl);
        } else {
            // Print the response
            echo $response;
        }

        // Close the cURL session
        curl_close($curl);
        break;
    case "GET":
        $response = file_get_contents($url);

        if ($response != false) {
            echo json_encode($response);
        }
        break;
}
?>
