package com.klef.soa.docker.service;

import java.util.List;

import com.klef.soa.docker.dto.DayCareCenterRequest;
import com.klef.soa.docker.dto.DayCareCenterResponse;
import com.klef.soa.docker.entity.DaycareCenter;

public interface DaycareCenterService {

	DayCareCenterResponse add(DayCareCenterRequest ds);
	
	List<DayCareCenterResponse> displayAll();
	
	String deleteById(long id);
	
	DayCareCenterResponse displayById(long id);

	DayCareCenterResponse update(long id, DayCareCenterRequest ds);
	
}
