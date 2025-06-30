package com.RasoiBot.Service;

import com.RasoiBot.Model.User;
import com.RasoiBot.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // 🔐 Register user with encrypted password
    public User registerUser(User user) throws Exception {
        Optional<User> existing = userRepository.findByEmail(user.getEmail());
        if (existing.isPresent()) {
            throw new Exception("Email already in use");
        }

        // Hash password
        String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        user.setPassword(hashedPassword);

        User savedUser = userRepository.save(user);
        savedUser.setPassword(null); // never return password
        return savedUser;
    }

    // 🔐 Login validation
    public User loginUser(String email, String password) throws Exception {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (BCrypt.checkpw(password, user.getPassword())) {
                user.setPassword(null); // hide password
                return user;
            } else {
                throw new Exception("Invalid email or password");
            }
        } else {
            throw new Exception("User not found");
        }
    }

    // 🥕 Save ingredients to user profile
    public void saveIngredients(String email, List<String> ingredients) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setIngredients(ingredients);
            userRepository.save(user);
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }

    // ✅ NEW: Get user by email (used in RecommendationController)
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
}
