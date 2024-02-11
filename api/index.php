<?php
// Enable CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: *");

// Check request method
include 'DbConnect.php';
$objDb =new DbConnect;
$conn = $objDb->connect();


$method = $_SERVER['REQUEST_METHOD'];

switch($method){
    case "GET":
        $sql = "SELECT * FROM users";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])){
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id',$path[3]);
            $stmt->execute();
            $users = $stmt ->fetch(PDO::FETCH_ASSOC);
        }else{
            $stmt = $conn->prepare($sql );
            $stmt->execute();
            $users = $stmt ->fetchAll(PDO::FETCH_ASSOC);
        }echo json_encode($users);
    break;
    case "POST":
        $users =json_decode( file_get_contents('php://input'));
        $sql ="INSERT INTO users(name, email,mobile, created_at) VALUES(:name, :email, :mobile, :created_at)";
        $stmt = $conn->prepare($sql );
        $created_at = date('Y-m-d');
        $stmt->bindParam(':name',$users->name);
        $stmt->bindParam(':email',$users->email);
        $stmt->bindParam(':mobile',$users->mobile);
        $stmt->bindParam(':created_at',$created_at);
        if($stmt->execute()){
            $response = ['status' => 1, 'message' => 'Record Created Successfully .'];
        }else{
            $response = ['status' => 0, 'message' => 'Failed To Create Record .'];
        }echo json_encode($response);
        break;
    case "PUT":
        $users =json_decode( file_get_contents('php://input'));
        $sql ="UPDATE users SET name=:name, email =:email, mobile= :mobile, updated_at= :updated_at WHERE id =:id";
        $stmt = $conn->prepare($sql );
        $updated_at = date('Y-m-d');
        $stmt->bindParam(':id',$users->id);
        $stmt->bindParam(':name',$users->name);
        $stmt->bindParam(':email',$users->email);
        $stmt->bindParam(':mobile',$users->mobile);
        $stmt->bindParam(':updated_at',$updated_at);
        if($stmt->execute()){
            $response = ['status' => 1, 'message' => 'Record Updated Successfully .'];
        }else{
            $response = ['status' => 0, 'message' => 'Failed To Update Record .'];
        }echo json_encode($response);
        break;
    case "DELETE":
        $sql = "DELETE FROM users WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id',$path[3]);

        if($stmt->execute()){
            $response = ['status' => 1, 'message' => 'Record Deleted Successfully .'];
        }else{
            $response = ['status' => 0, 'message' => 'Failed To Delete Record .'];
        }echo json_encode($response);
        break;
    case "OPTIONS":
        // Respond to preflight request
        header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: *");
        header("HTTP/1.1 200 OK");
        exit();
        break; 

    default:
        // Handle unsupported methods
        header("HTTP/1.1 405 Method Not Allowed");
        header("Allow: POST, GET, PUT, DELETE, OPTIONS");
        exit();
        break;
}
?>
