package com.prathamesh.Personal.Task.Manager.Dto;

import com.prathamesh.Personal.Task.Manager.Model.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskRequest {

    @NotBlank(message = "Title is required!!")
    private String title;
    private String description;
    private TaskStatus status;
}
