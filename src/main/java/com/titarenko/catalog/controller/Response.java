package com.titarenko.catalog.controller;

public class Response {
    private Long savedId;

    public Response(Long savedId) {
        this.savedId = savedId;
    }

    public Long getSavedId() {
        return savedId;
    }

    public void setSavedId(Long savedId) {
        this.savedId = savedId;
    }
}
