library(tidyverse)
library(jsonlite)

data <- read.csv("data/state_by_state.csv")

data[data==""] = NA

data <- data %>%
  select(-c("X", "GRANTEE.DESCRIPTION", "SAMPLE.PROJECTS")) %>%
  filter(!is.na(data$POTENTIAL.FUNDERS)) %>%
  fill("STATE", .direction="down") %>%
  rename("POTENTIAL_FUNDERS"="POTENTIAL.FUNDERS",
         "PROJECT_DESCRIPTION"="PROJECT.DESCRIPTION")
  
write.csv(data, "data/cleaned_info.csv")
write_json(data, "data/cleaned_info.json")