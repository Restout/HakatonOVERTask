package com.example.hakatonovertask.controllers;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.List;

import com.example.hakatonovertask.models.news.News;
import com.example.hakatonovertask.models.news.NewsDAO;
import com.example.hakatonovertask.models.news.NewsOut;
import com.example.hakatonovertask.service.NewsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;


import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(MockitoExtension.class)
public class NewsControllerTest {
    private MockMvc mockMvc;

    @InjectMocks
    private NewsController newsController;

    @Mock
    private NewsService newsService;

    private ObjectMapper objectMapper;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(newsController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    @DisplayName("Test getNews")
    public void testGetNews() throws Exception {
        Integer limit = 10;
        Integer page = 0;

        NewsOut news1 = new NewsOut();
        news1.setId(1);
        news1.setTitle("First News");
        news1.setContent("First News Content");

        NewsOut news2 = new NewsOut();
        news2.setId(2);
        news2.setTitle("Second News");
        news2.setContent("Second News Content");

        List<NewsOut> newsList = Arrays.asList(news1, news2);

        when(newsService.GetNewsPage(ArgumentMatchers.eq(limit), ArgumentMatchers.eq(page)))
                .thenReturn(newsList);

        mockMvc.perform(get("/api/news")
                        .param("limit", limit.toString())
                        .param("page", page.toString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].title", is("First News")))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[1].title", is("Second News")));

        verify(newsService).GetNewsPage(ArgumentMatchers.eq(limit), ArgumentMatchers.eq(page));
    }

    @Test
    @DisplayName("Test saveNews success")
    public void testSaveNewsSuccess() throws Exception {
        NewsDAO newsDAO = new NewsDAO();
        newsDAO.setTitle("New Article");
        newsDAO.setContent("News Content");

        News savedNews = new News();
        savedNews.setId(1);
        savedNews.setTitle("New Article");
        savedNews.setContent("News Content");

        when(newsService.SaveNews(ArgumentMatchers.any(NewsDAO.class)))
                .thenReturn(savedNews);

        MockMultipartFile jsonFile = new MockMultipartFile(
                "news",
                "",
                "application/json",
                objectMapper.writeValueAsBytes(newsDAO)
        );

        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/auth/news")
                        .file(jsonFile)
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.title", is("New Article")))
                .andExpect(jsonPath("$.content", is("News Content")));

        verify(newsService).SaveNews(ArgumentMatchers.any(NewsDAO.class));
    }

    @Test
    @DisplayName("Test saveNews failure")
    public void testSaveNewsFailure() throws Exception {
        NewsDAO newsDAO = new NewsDAO();
        newsDAO.setTitle("Invalid Article");
        newsDAO.setContent("Invalid Content");

        when(newsService.SaveNews(ArgumentMatchers.any(NewsDAO.class)))
                .thenThrow(new RuntimeException("Invalid news data"));

        MockMultipartFile jsonFile = new MockMultipartFile(
                "news",
                "",
                "application/json",
                objectMapper.writeValueAsBytes(newsDAO)
        );

        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/auth/news")
                        .file(jsonFile)
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isBadRequest());

        verify(newsService).SaveNews(ArgumentMatchers.any(NewsDAO.class));
    }

    @Test
    @DisplayName("Test deleteNews")
    public void testDeleteNews() throws Exception {
        Integer newsId = 1;

        mockMvc.perform(delete("/api/auth/news/{id}", newsId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(newsService).deleteNews(ArgumentMatchers.eq(newsId));
    }
}