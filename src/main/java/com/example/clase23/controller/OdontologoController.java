package com.example.clase23.controller;

import com.example.clase23.entities.Odontologo;
import com.example.clase23.entities.Paciente;
import com.example.clase23.service.OdontologoService;
import exceptions.BadRequestException;
import exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/odontologos")
public class OdontologoController {
    @Autowired
    private OdontologoService odontologoService;

    @PostMapping
    public ResponseEntity<Odontologo> registrarOdontologo(@RequestBody Odontologo odontologo){
        return ResponseEntity.ok(odontologoService.guardarOdontologo(odontologo));
    }
    @GetMapping("/{id}")
    public ResponseEntity<Odontologo> buscarOdontologo(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarOdontologoPorID(id);
        if(odontologoBuscado.isPresent()){
            return ResponseEntity.ok(odontologoBuscado.get());
        }else{
            throw new ResourceNotFoundException("El odontologo de id: "+id+" no existe");
        }
    }
    @GetMapping("/list")
    public ResponseEntity<List<Odontologo>> listarOdontologos(Odontologo odontologo) throws BadRequestException {
        List<Odontologo> odontologos = odontologoService.devolverOdontologos(odontologo);
        if(odontologos.isEmpty()){
            throw new BadRequestException("No se encuentra guardado ningun odontologo");
        }else{
            return ResponseEntity.ok(odontologos);
        }
    }
    @PutMapping
    public ResponseEntity<String> actualizarOdontologo(@RequestBody Odontologo odontologo) throws BadRequestException{
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarOdontologoPorID(odontologo.getId());
        if(odontologoBuscado.isPresent()){
            odontologoService.actualizarOdontologo(odontologo);
            return ResponseEntity.ok("El odontologo con id: "+ odontologo.getId()+ " fue actualizado correctamente.");
        }else {
            throw new BadRequestException("El odontologo con id : "+odontologo.getId()+" no existe.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarOdontologo(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarOdontologoPorID(id);
        if (odontologoBuscado.isPresent()) {
            odontologoService.eliminarOdontologo(id);
            return ResponseEntity.ok("El Odontologo con id: " + id + " fue eliminado correctamente");
        } else {
            throw new ResourceNotFoundException("El odontologo con id: " + id + " no existe.");
        }
    }
}
