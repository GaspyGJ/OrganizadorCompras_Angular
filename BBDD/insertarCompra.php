<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: *");
$jsonListaProductos = json_decode(file_get_contents("php://input"));
if (!$jsonMascota) {
    exit("No hay datos");
}
$bd = include_once "bd.php";

$sentencia = $bd->prepare("INSERT INTO comprasuper.compra(FechaCompra,PrecioTotal) VALUES (?,?)");
$resultado = $sentencia->execute([$jsonListaProductos->FechaCompra, $jsonListaProductos->PrecioTotal]);
echo json_encode([
    "resultado" => $resultado,
]);