package com.RasoiBot.dto;

import java.util.List;

public class UserIngredientDTO {
    private String email;
    private List<String> ingredients;

    // Getters and Setters
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getIngredients() {
        return ingredients;
    }
    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }
}
