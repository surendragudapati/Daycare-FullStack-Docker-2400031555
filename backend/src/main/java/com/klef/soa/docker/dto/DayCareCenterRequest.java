package com.klef.soa.docker.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DayCareCenterRequest
{
    @NotBlank(message = "Center Name is Required")
    private String centerName;

    @NotBlank(message = "Location is Required")
    private String location;

    @NotNull(message = "Child Capacity is Required")
    @Min(value = 1, message = "Capacity must be greater than 0")
    @Max(value = 500, message = "Capacity cannot exceed 500")
    private Integer childCapacity;

    @NotNull(message = "Licensed field is Required")
    private Boolean licensed;
}