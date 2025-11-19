package com.example.trabalhobackefront.backup;

import java.io.IOException;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@EnableScheduling
public class BackUpMain {


    private final String backUpDirectory = "C:\\BackUp\\";

    private final String dbHost = "localhost";
    private final String dbPort = "5432";
    private final String dbUser = "postgres";
    private final String dbPass = "2031";
    private final String dbName = "escola_db";

    @Scheduled(cron = "0 0 0 * * *")
    public void BackUpStart() {


        String dataHora = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd_HH-mm"));
        String filePath = backUpDirectory + "backup_" + dataHora + ".sql";


        String[] command = {
                "C:\\Program Files\\PostgreSQL\\18\\bin\\pg_dump.exe",
                "-h", dbHost,
                "-p", dbPort,
                "-U", dbUser,
                "-F", "c",
                "-f", filePath,
                dbName
        };
        ProcessBuilder pb = new ProcessBuilder(command);
        Map<String, String> env = pb.environment();
        env.put("PGPASSWORD", dbPass);

        try {
            Process process = pb.start();
            int exitCode = process.waitFor();

            if (exitCode == 0) {
                System.out.println("Backup realizado: " + backUpDirectory);
            } else {
                System.err.println("O Backup não foi realizado \n: " + exitCode);

            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}



