package com.DATN.WebBanDienThoai.service.Impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.DATN.WebBanDienThoai.entity.Feedback;
import com.DATN.WebBanDienThoai.repository.FeedbackRepository;
import com.DATN.WebBanDienThoai.service.FeedbackService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class FeedbackServiceImpl implements FeedbackService{
	private final FeedbackRepository feedbackRepo;
	@Override
	public String save(Feedback feedback) {
		feedbackRepo.save(feedback);
		return "save feedback successfully";
	}

	@Override
	public List<Feedback> findAll() {
		
		return feedbackRepo.findAll();
	}

	@Override
	public Feedback findById(UUID id) {
		Optional<Feedback> feedbackOptional = feedbackRepo.findById(id);
		if(feedbackOptional.isEmpty()) {
			return null;
		}
		return feedbackOptional.get();
	}

	@Override
	public String updateById(UUID id, Feedback feedback) {
		Optional<Feedback> feedbackOptional = feedbackRepo.findById(id);
		if(feedbackOptional.isEmpty()) {
			return "can't update feedback with id = "+ id;
		}
		Feedback oldFeedback = feedbackOptional.get();
		oldFeedback.setContent(feedback.getContent());
		oldFeedback.setFieldCustomer(feedback.getFieldCustomer());
		oldFeedback.setNameCustomer(feedback.getNameCustomer());
		oldFeedback.setImage(feedback.getImage());
		feedbackRepo.save(oldFeedback);
		return "update successfully";		
	}

	@Override
	public String deleteById(UUID id) {
		Optional<Feedback> feedbackOptional = feedbackRepo.findById(id);
		if(feedbackOptional.isEmpty()) {
			return "can't delete feedback with id = "+ id;
		}
		Feedback oldFeedback = feedbackOptional.get();
		feedbackRepo.delete(oldFeedback);
		return "deletet successfully";		
	}

}
