package com.groupproject.services;

import com.groupproject.entities.Language;
import com.groupproject.requests.LanguageRequest;

import java.util.List;

public interface ILanguageService {

    // list of all languages
    List<Language> getAll();

    // get language by id
    Language getById(Long id);

    // new language
    void newLanguage(LanguageRequest request);


    // delete language(by id)
    boolean deleteLanguage(Long id);

}