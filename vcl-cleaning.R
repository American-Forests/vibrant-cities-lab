library(tidyverse)
library(jsonlite)

data <- read.csv("data/state_by_state.csv")

data[data==""] = NA

data <- data %>%
  select(-c("X")) %>%
  filter(!is.na(data$POTENTIAL.FUNDERS)) %>%
  fill("STATE", .direction="down") %>%
  rename("POTENTIAL_FUNDERS"="POTENTIAL.FUNDERS",
         "PROJECT_DESCRIPTION"="PROJECT.DESCRIPTION",
         "GRANTEE_DESCRIPTION"="GRANTEE.DESCRIPTION",
         "SAMPLE_PROJECTS"="SAMPLE.PROJECTS")
  
write_json(data, "data/cleaned_info.json")
