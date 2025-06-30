package com.RasoiBot.Controller;

import com.RasoiBot.Model.User;
import com.RasoiBot.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.ResourceAccessException;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5174") // React frontend URL
public class RecommendationController {

    @Autowired
    private UserService userService;

    @PostMapping("/recommendations")
    public ResponseEntity<?> getRecommendations(@RequestBody Map<String, String> body) {
        try {
            // ✅ 1. Extract email from JSON body
            String email = body.get("email");
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Email is required.");
            }

            // ✅ 2. Get user by email
            User user = userService.getUserByEmail(email);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("User not found with email: " + email);
            }

            List<String> ingredients = user.getIngredients();
            if (ingredients == null || ingredients.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body("No ingredients found for this user.");
            }

            // ✅ 3. Call Flask API
            String flaskUrl = "http://localhost:5000/recommend"; // Flask server URL

            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> payload = new HashMap<>();
            payload.put("ingredients", ingredients);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);

            ResponseEntity<List> flaskResponse =
                    restTemplate.postForEntity(flaskUrl, request, List.class);

            return ResponseEntity.ok(flaskResponse.getBody());

        } catch (ResourceAccessException e) {
            // Flask server not reachable
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body("Flask server not reachable: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to fetch recommendations: " + e.getMessage());
        }
    }
}
