package com.example.clase23.service;

import com.example.clase23.entities.Paciente;
import com.example.clase23.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {
    @Autowired
    private PacienteRepository pacienteRepository;

   public Paciente guardarPaciente(Paciente paciente){
       return pacienteRepository.save(paciente);
   }
   public Optional<Paciente> buscarPacientePorID(Long id){
       return pacienteRepository.findById(id);
   }
   public void eliminarPaciente(Long id){pacienteRepository.deleteById(id);}
   public void actualizarPaciente(Paciente paciente){
       pacienteRepository.save(paciente);
   }
   public List<Paciente> devolverPacientes(Paciente paciente){
       return pacienteRepository.findAll();
   }
   public Optional<Paciente> buscarPacientePorCorreo(String correo){
       return pacienteRepository.findByEmail(correo);
   }
}
