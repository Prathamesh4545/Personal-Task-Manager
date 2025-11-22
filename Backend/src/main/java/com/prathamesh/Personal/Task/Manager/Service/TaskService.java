package com.prathamesh.Personal.Task.Manager.Service;

import com.prathamesh.Personal.Task.Manager.Dto.TaskRequest;
import com.prathamesh.Personal.Task.Manager.Dto.TaskResponse;
import com.prathamesh.Personal.Task.Manager.Model.Task;
import com.prathamesh.Personal.Task.Manager.Model.TaskStatus;
import com.prathamesh.Personal.Task.Manager.Repository.TaskRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class TaskService {

   private final TaskRepository taskRepository;

    public List<TaskResponse> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public TaskResponse getTaskById(Long id){
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        return mapToResponse(task);
    }

    public TaskResponse createTask(TaskRequest request){
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus() != null ? request.getStatus() : TaskStatus.PENDING);

        Task saveTask = taskRepository.save(task);
        return mapToResponse(saveTask);
    }

    public TaskResponse updateTask(Long id,TaskRequest request){
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        if(request.getStatus() != null){
            task.setStatus(request.getStatus());
        }
        Task updateTask = taskRepository.save(task);
        return mapToResponse(updateTask);
    }

    public void deleteTask(Long id){
        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("Task not found");
        }
        taskRepository.deleteById(id);
    }

    private TaskResponse mapToResponse(Task task) {

        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getCreatedAt(),
                task.getUpdatedAt()
        );
    }

}
