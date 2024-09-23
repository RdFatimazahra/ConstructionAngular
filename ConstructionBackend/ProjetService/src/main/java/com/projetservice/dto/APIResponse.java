package com.projetservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.stream.Stream;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class APIResponse<T> {
    int recordCount;
    T response;

}
