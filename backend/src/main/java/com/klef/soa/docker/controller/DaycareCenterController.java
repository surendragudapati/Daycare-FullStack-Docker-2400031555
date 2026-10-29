
package com.klef.soa.docker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.soa.docker.dto.DayCareCenterRequest;
import com.klef.soa.docker.dto.DayCareCenterResponse;
import com.klef.soa.docker.service.DaycareCenterService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/daycare")
public class DaycareCenterController {

    @Autowired
    private DaycareCenterService service;

    @GetMapping("/")
    public String test() {
        return "Is Running";
    }

    @PostMapping("/add")
    public ResponseEntity<DayCareCenterResponse> add(@Valid @RequestBody DayCareCenterRequest ds) {

        return ResponseEntity.status(201).body(service.add(ds));
    }

    @GetMapping("/displayall")
    public ResponseEntity<List<DayCareCenterResponse>> displayAll() {

        return ResponseEntity.ok(service.displayAll());
    }

    @GetMapping("/display/{id}")
    public ResponseEntity<DayCareCenterResponse> displayById(@PathVariable long id) {

        DayCareCenterResponse response = service.displayById(id);

        if (response == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<DayCareCenterResponse> update(@PathVariable long id, @Valid @RequestBody DayCareCenterRequest ds) {

        DayCareCenterResponse response = service.update(id, ds);

        if (response == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteById(@PathVariable long id) {

        String message = service.deleteById(id);

        if (message.contains("Not availabe")) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(message);
    }
}
