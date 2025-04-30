import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories(basePackages = "com.example.be12hrimimhrbe.domain.activity")
@SpringBootApplication
public class Be12HrimImhrBeApplication {
	public static void main(String[] args) {
		SpringApplication.run(Be12HrimImhrBeApplication.class, args);
	}
}
