<?php
require_once 'Conexion.php';

class Clientes extends Conexion
{
    public $cliente_id;
    public $cliente_nombre;
    public $cliente_apellido;
    public $cliente_genero;
    public $cliente_situacion;


    public function __construct($args = [])
    {
        $this->cliente_id = $args['cliente_id'] ?? null;
        $this->cliente_nombre = $args['cliente_nombre'] ?? '';
        $this->cliente_apellido = $args['cliente_apellido'] ?? '';
        $this->cliente_genero = $args['cliente_genero'] ?? '';
        $this->cliente_situacion = $args['cliente_situacion'] ?? '';
    }

    public function guardar()
    {
        $sql = "INSERT INTO clientes(cliente_nombre, cliente_apellido, cliente_genero) values('$this->cliente_nombre','$this->cliente_apellido','$this->cliente_genero')";
        $resultado = self::ejecutar($sql);
        return $resultado;
    }

    public function buscar()
    {
        $sql = "SELECT * from clientes where cliente_situacion = 1 ";

        if ($this->cliente_nombre != '') {
            $sql .= " and cliente_nombre like '%$this->cliente_nombre%' ";
        }

        if ($this->cliente_apellido != '') {
            $sql .= " and cliente_apellido = $this->cliente_apellido ";
        }

        if ($this->cliente_genero != '') {
            $sql .= " and cliente_genero = $this->cliente_genero ";
        }

        if ($this->cliente_id != null) {
            $sql .= " and cliente_id = $this->cliente_id ";
        }

        $resultado = self::servir($sql);
        return $resultado;
    }

    public function modificar()
    {
        $sql = "UPDATE clientes SET cliente_nombre = '$this->cliente_nombre', cliente_apellido = $this->cliente_apellido where cliente_id = $this->cliente_id";

        $resultado = self::ejecutar($sql);
        return $resultado;
    }

    public function eliminar()
    {
        $sql = "UPDATE clientes SET cliente_situacion = 0 where cliente_id = $this->cliente_id";

        $resultado = self::ejecutar($sql);
        return $resultado;
    }
}
