package com.example.clase23.service;

import com.example.clase23.entities.Paciente;
import com.example.clase23.entities.Turno;
import com.example.clase23.repository.PacienteRepository;
import com.example.clase23.repository.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TurnoService {
    @Autowired
    private TurnoRepository turnoRepository;

    public Turno guardarTurno(Turno turno){
        return turnoRepository.save(turno);
    }
    public Optional<Turno> buscarTurnoPorID(Long id){
        return turnoRepository.findById(id);
    }
    public void eliminarTurno(Long id){turnoRepository.deleteById(id);}
    public void actualizarTurno(Turno turno){
        turnoRepository.save(turno);
    }
    public List<Turno> devolverTurnos(Turno turno){
        return turnoRepository.findAll();
    }
}
