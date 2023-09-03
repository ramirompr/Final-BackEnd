package securityConfiguration;

import com.example.clase23.entities.AppUsuario;
import com.example.clase23.entities.AppUsuarioRol;
import com.example.clase23.service.AppUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class CargadoraDeDatos implements ApplicationRunner {

    // aca el profe jorge lo hizo con repository
    AppUsuarioService appUsuarioService;

    @Autowired
    public CargadoraDeDatos(AppUsuarioService appUsuarioService) {
        this.appUsuarioService = appUsuarioService;
    }


    @Override
    public void run(ApplicationArguments args) throws Exception {
        BCryptPasswordEncoder passwordEncoder= new BCryptPasswordEncoder();
        //ROL ADMINISTRADOR
        String passAdmin="pass";
        String passCifradoAdmin= passwordEncoder.encode(passAdmin);
        System.out.println("La contraseña cifrada es: "+passCifradoAdmin);
        appUsuarioService.guardarUsuario(new AppUsuario("Diego","Carrizo","diegok@gmail.com",passCifradoAdmin, AppUsuarioRol.ROLE_ADMIN));
        //ROL USUARIO
        String passUser="pass";
        String passCifradoUser= passwordEncoder.encode(passUser);
        System.out.println("La contraseña cifrada es: "+passCifradoUser);
        appUsuarioService.guardarUsuario(new AppUsuario("Fernanda","Michel","ferm@gmail.com",passCifradoUser, AppUsuarioRol.ROLE_USER));
        //ROL CEO
        String passCeo="pass";
        String passCifradoCeo= passwordEncoder.encode(passUser);
        System.out.println("La contraseña cifrada es: "+passCifradoCeo);
        appUsuarioService.guardarUsuario(new AppUsuario("Emma","Gimenez","emmag@gmail.com",passCifradoUser, AppUsuarioRol.ROLE_CEO));

    }
}
