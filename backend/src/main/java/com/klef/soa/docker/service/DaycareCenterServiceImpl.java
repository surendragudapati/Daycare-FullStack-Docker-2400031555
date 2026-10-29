	package com.klef.soa.docker.service;
	
	import java.util.List;
	
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.stereotype.Service;
	
	import com.klef.soa.docker.dto.DayCareCenterRequest;
	import com.klef.soa.docker.dto.DayCareCenterResponse;
	import com.klef.soa.docker.entity.DaycareCenter;
	import com.klef.soa.docker.repository.DaycareCenterRepository;
	
	@Service
	public class DaycareCenterServiceImpl implements DaycareCenterService{
	
		@Autowired
		private DaycareCenterRepository repository;
		
		public DayCareCenterResponse mapToResponse(DaycareCenter dc) {
			return DayCareCenterResponse.builder()
					.centerName(dc.getCenterName())
					.childCapacity(dc.getChildCapacity())
					.licensed(dc.getLicensed())
					.location(dc.getLocation())
					.id(dc.getId())
					.build();
		}
		
		@Override
		public DayCareCenterResponse add(DayCareCenterRequest ds) {
			
			DaycareCenter dc = new DaycareCenter();
			
			dc.setCenterName(ds.getCenterName());
			dc.setChildCapacity(ds.getChildCapacity());
			dc.setLicensed(ds.getLicensed());
			dc.setLocation(ds.getLocation());
			
			DaycareCenter dz = repository.save(dc);
			return mapToResponse(dz);
		}
	
		@Override
		public List<DayCareCenterResponse> displayAll() {
			
			return repository.findAll()
					.stream()
					.map(this::mapToResponse)
					.toList();
		}
	
		@Override
		public String deleteById(long id) {
			boolean flag = repository.existsById(id);
			
			if(flag) {
				
				repository.deleteById(id);
				return id + "Id was deleted..!!";
			}
			else {
				return id + "Id was Not availabe..!!";
			}
			
		}
	
		@Override
		public DayCareCenterResponse displayById(long id) {
			
			DaycareCenter ds = repository.findById(id).orElse(null);
			
			if(ds == null) {
				
				return null;
			}
			
			return mapToResponse(ds);
		
		}
	
		@Override
		public DayCareCenterResponse update(long id, DayCareCenterRequest ds) {
			
			DaycareCenter dc = repository.findById(id).orElse(null);
			
			if(dc == null) {
				
				return null;
			}
			
			dc.setCenterName(ds.getCenterName());
			dc.setChildCapacity(ds.getChildCapacity());
			dc.setLocation(ds.getLocation());
			dc.setLicensed(ds.getLicensed());
			repository.save(dc);
			return mapToResponse(dc);
		}
	
		
	
	}
