package com.example.clase23.controller;

import com.example.clase23.entities.Paciente;
import com.example.clase23.service.PacienteService;
import exceptions.BadRequestException;
import exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pacientes")
public class PacienteController {
   @Autowired
    private PacienteService pacienteService;

    @PostMapping
    public ResponseEntity<Paciente> registrarPaciente(@RequestBody Paciente paciente){
        return ResponseEntity.ok(pacienteService.guardarPaciente(paciente));
    }
    @GetMapping("/{id}")
    public ResponseEntity<Paciente> buscarPaciente(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<Paciente> pacienteBuscado= pacienteService.buscarPacientePorID(id);
        if(pacienteBuscado.isPresent()){
            return ResponseEntity.ok(pacienteBuscado.get());
        }else {
            throw new ResourceNotFoundException("Error al buscar id: "+id+" no se encontró.");
        }
    }
    @GetMapping("/list")
    public ResponseEntity<List<Paciente>> listarPacientes(Paciente paciente) throws BadRequestException {
        List<Paciente> pacientes = pacienteService.devolverPacientes(paciente);
        if(pacientes.isEmpty()){
            throw new BadRequestException("No hay pacientes que listar");
        }else{
            return ResponseEntity.ok(pacientes);
        }
    }
    @PutMapping
    public ResponseEntity<String> actualizarPaciente(@RequestBody Paciente paciente) throws BadRequestException{
        Optional<Paciente> pacienteBuscado = pacienteService.buscarPacientePorID(paciente.getId());
        if(pacienteBuscado.isPresent()){
            pacienteService.actualizarPaciente(paciente);
            return ResponseEntity.ok("Se actualizo correctamente el paciente con id: "+paciente.getId());
        }else{
            throw new BadRequestException("El paciente con id: "+paciente.getId()+" no se existe.");
        }
    }
    @GetMapping("/correo/{correo}")
    public ResponseEntity<Paciente> buscarPacientePorCorreo(@PathVariable String correo) throws ResourceNotFoundException{
        Optional<Paciente> pacienteBuscado = pacienteService.buscarPacientePorCorreo(correo);
        if(pacienteBuscado.isPresent()){
            return ResponseEntity.ok(pacienteBuscado.get());
        }else{
            throw new ResourceNotFoundException("No existe un odontologo con el correo ingresado");
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarPaciente(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Paciente> pacienteBuscado = pacienteService.buscarPacientePorID(id);
        if(pacienteBuscado.isPresent()){
            pacienteService.eliminarPaciente(id);
            return ResponseEntity.ok("Se elimino correctamente el paciente con id: "+ id);
        }else {
            throw new ResourceNotFoundException("Error al eliminar el id: "+id+", no existe.");
        }
    }
}
