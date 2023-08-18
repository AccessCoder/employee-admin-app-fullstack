package de.mpagels.backend;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@With
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Employee {

    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String role;

}
