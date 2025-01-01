import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

const CLanguageDropdown = ({ languages }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (language) => {
    i18n.changeLanguage(language.code); // Sprache ändern
    setIsOpen(false); // Dropdown schließen
  };

  const currentLanguage = languages.find(
    (lang) => lang.code === i18n.language
  );

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Button */}
      <button
        onClick={toggleDropdown}
        className="cl_language_Button"
      >
        {currentLanguage ? (
          <span style={{ fontSize: "var(--font-size)" }}>{currentLanguage.flag}</span>
        ) : (
          "🌐"
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <ul
        className="cl_language_DropDownBox"
        >
          {languages.map((language) => (
            <li
              key={language.code}
              onClick={() => handleSelect(language)}
              className="cl_language_DropDownElement"
            >
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CLanguageDropdown;
