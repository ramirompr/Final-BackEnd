package com.example.clase23.controller;

import com.example.clase23.entities.Odontologo;
import com.example.clase23.entities.Paciente;
import com.example.clase23.entities.Turno;
import com.example.clase23.service.OdontologoService;
import com.example.clase23.service.PacienteService;
import com.example.clase23.service.TurnoService;
import exceptions.BadRequestException;
import exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/turnos")
public class TurnoController {
@Autowired
    private TurnoService turnoService;
@Autowired
    private PacienteService pacienteService;
@Autowired
    private OdontologoService odontologoService;


    @PostMapping
    public ResponseEntity<Turno> registrarTurno(@RequestBody Turno turno) throws BadRequestException {
        Optional<Paciente> pacienteBuscado = pacienteService.buscarPacientePorID(turno.getPaciente().getId());
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarOdontologoPorID(turno.getOdontologo().getId());

        if (pacienteBuscado.isPresent() && odontologoBuscado.isPresent()) {
            return ResponseEntity.ok(turnoService.guardarTurno(turno));
        } else if(pacienteBuscado.isPresent() && odontologoBuscado.isEmpty()){
            throw new BadRequestException("El odontologo ingresado no existe");
        } else if (pacienteBuscado.isEmpty() && odontologoBuscado.isPresent()) {
            throw new BadRequestException("El paciente ingresado no existe");
        }else{
            throw new BadRequestException("Ni el paciente ni el odontologo ingresados existen");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Turno> buscarTurno(@PathVariable Long id) throws ResourceNotFoundException{
        Optional <Turno> turnoBuscado= turnoService.buscarTurnoPorID(id);
        if(turnoBuscado.isPresent()){
            return ResponseEntity.ok(turnoBuscado.get());
        }else{
            throw new ResourceNotFoundException("El turno de id: "+id+" no existe");
        }
    }
    @GetMapping("/list")
    public ResponseEntity<List<Turno>> listarTurnos(Turno turno) throws BadRequestException{
        List<Turno> turnos = turnoService.devolverTurnos(turno);
        if(turnos.isEmpty()){
            throw new BadRequestException("No se encuentra guardado ningun turno");
        }else{
            return ResponseEntity.ok(turnos);
        }
    }

    @PutMapping
    public ResponseEntity<String> actualizarTurno(@RequestBody Turno turno) throws BadRequestException{
        Optional<Turno> turnoBuscado= turnoService.buscarTurnoPorID(turno.getId());
        if(turnoBuscado.isPresent()){
            if(odontologoService.buscarOdontologoPorID(turno.getOdontologo().getId()).isPresent() && pacienteService.buscarPacientePorID(turno.getPaciente().getId()).isPresent()){
                turnoService.actualizarTurno(turno);
                return ResponseEntity.ok("Se ha actualizado correctamente el turno de id: "+ turno.getId());
            }else{
                throw new BadRequestException("No se ha actualizo porque paciente u odontologo no se existen");
            }
        }else{
            throw new BadRequestException("No ha actualizado porque el turno no existe");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarTurno(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Turno> turnoBuscado =turnoService.buscarTurnoPorID(id);
        if (turnoBuscado.isPresent()){
            turnoService.eliminarTurno(id);
            return ResponseEntity.ok("Se elimino correctamente el turno con id: "+id);

        }else{
            throw new ResourceNotFoundException("El turno de id: "+id+" no existe.");
        }
    }
}
