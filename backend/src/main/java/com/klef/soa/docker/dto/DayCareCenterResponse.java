package com.klef.soa.docker.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DayCareCenterResponse
{
    private Long id;
    private String centerName;
    private String location;
    private Integer childCapacity;
    private Boolean licensed;
}