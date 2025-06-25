package com.RasoiBot.Controller;

import com.RasoiBot.Model.User;
import com.RasoiBot.Service.UserService;
import com.RasoiBot.dto.UserIngredientDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5174") // React frontend port
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        try {
            User savedUser = userService.registerUser(user);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body("Signup failed: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        try {
            User loggedInUser = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok(loggedInUser);
        } catch (Exception e) {
            return ResponseEntity
                    .status(401)
                    .body("Login failed: " + e.getMessage());
        }
    }

    // ✅ Save ingredients to user's profile
    @PostMapping("/ingredients")
    public ResponseEntity<?> saveIngredients(@RequestBody UserIngredientDTO dto) {
        try {
            userService.saveIngredients(dto.getEmail(), dto.getIngredients());
            return ResponseEntity.ok("Ingredients saved successfully");
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body("Failed to save ingredients: " + e.getMessage());
        }
    }
}
