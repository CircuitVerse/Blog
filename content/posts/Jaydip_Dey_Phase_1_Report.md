---
title: "CircuitVerse Practice Section: Phase 1 Report (GSoC 2024)"
date: 2024-07-10
draft: false
author: Jaydip Dey
type: post
---



This blog is dedicated to summarise the progress for the first phase of the project "CircuitVerse Practice Section" in Google Summer of Code'2024.

![phase-1](/images/Jaydip_GSoC24/Phase-1.png)

## About My Project

The project aims to address the need for a comprehensive practice section within CircuitVerse, enhancing learning and engagement in digital logic design. It includes developing a Question Bank Management system for convenient access to categorized questions, each featuring a Circuit Template with input/output probes and a pre-configured testbench. Markdown support will be integrated for improved readability and flexibility in displaying questions. A Question Bank Moderator role will be introduced for selected users to add and modify questions. Answers submitted by users will be automatically verified using CircuitVerse's testbench feature, enhancing the learning experience. Additionally, a Progress Dashboard within user profiles will track submission history and progress, with users able to choose between public or private visibility.

In the first phase, we have covered
* Community Bonding Period
* Creating controllers, schemas and tables for all the use case [Week 1 to 3]
* Manage question moderators[Week 4]
* Moderator Question Creation and Integration[Week 5 to 6]

---

### Community Bonding Period

During the community bonding period for GSoC at CircuitVerse, we engaged in various activities to prepare for the project. We began by participating in meet-and-greet sessions with mentors, contributors, and admins, where we shared our excitement for GSoC, discussed our journeys, and introduced our projects. My mentors [Vaibhav Upreti](https://www.linkedin.com/in/vaibhav-upreti/), [Vedant Jain](https://www.linkedin.com/in/vedant-jain-781006145/), and [Tanmoy Sarkar](https://www.linkedin.com/in/tanmoysrt/), answered my questions about the CircuitVerse Practice Section project, and [Aboobacker MK](https://www.linkedin.com/in/aboobacker-m-k/) provided insights into the 12-week project process and discussed open defects in CircuitVerse.

Following this, we revisited key technologies by refreshing my knowledge of Ruby on Rails through The Odin Project documentation and Vue JS with a YouTube crash course. This preparation was essential for my upcoming work on the CircuitVerse codebase.

We then focused on a detailed exploration of the CircuitVerse codebase, identifying areas for modification and making initial changes. we had in-depth discussions with [Ruturaj Mohite](https://www.linkedin.com/in/ruturaj-mohite/), about potential edge cases and the development of the question practice simulator versus the standard simulator, including how to track and save user progress.

Overall, the community bonding period was an enriching experience that laid a strong foundation for the project.

---

### Creating controllers, schemas and tables for all the use case

In the initial three weeks of development, the focus was on establishing the backend components of the Question Management System. This included schema creation, controller development, and user authorization features.

**DB Diagram**
![db-diagram](/images/Jaydip_GSoC24/db-diagram.png)

#### Schema and Tables:

- **New Tables:**
  - **`Questions`**: Stores question details with a foreign key linking to `Categories` and an enum for difficulty levels.
  - **`Categories`**: Stores category information used for organizing questions.

- **Modifications:**
  - Added `difficulty_level` enum to the `Questions` table with values: `easy`, `medium`, `hard`, `expert`.
  - Added new fields to the `Users` table:
    - `submission_history` (JSONB array to track user submissions)
    - `public` (Boolean to indicate if the user's dashboard is public)
    - `question_bank_moderator` (Boolean to indicate if the user is a moderator)

- **Foreign Key:**
  - Added a foreign key constraint from `Questions` to `Categories`.

#### Models and Relationships:

- **`Question` Model**:
  - `belongs_to :category`
  - Enum for `difficulty_level`: `easy`, `medium`, `hard`, `expert`

- **`Category` Model**:
  - `has_many :questions`, dependent on destroy

#### Controllers and CRUD Operations:

##### Categories Controller
- **Functions:**
  - `index`: Fetch all categories.
  - `create`: Create a new category (requires user to be a moderator).

- **Authorization**:
  - `authorize_moderator`: Checks if the current user is a moderator.

##### Questions Controller
- **Functions:**
  - `index`: Fetch all questions.
  - `show`: Get a question by ID.
  - `create`: Create a new question.
  - `update`: Update an existing question.
  - `destroy`: Delete a question.
  - `filter`: Filter questions by `category_id` and `difficulty_level`.
  - `status`: Fetch questions based on user status (`unattempted`, `attempted`, `solved`).
  - `search`: Search questions by `heading` or `statement`.
  
- **Private Methods**:
  - `authorize_moderator`: Ensures the user is a moderator.
  - `set_question`: Fetches a question by ID.
  - `question_params`: Permits parameters for `Question` creation and updates.

##### QuestionSubmission Controller
- **Functions:**
  - `post_submission`: Handles user submission of responses.
  - `show_submission`: Retrieves a specific submission from the user's history.

##### User Controller Enhancements

- **New Fields:**
  - `submission_history` (JSONB array of submissions)
  - `public` (Boolean to toggle dashboard privacy)
  - `question_bank_moderator` (Boolean to manage moderator access)

- **New Methods:**
  - `submission_status`: Retrieves the submission history for a user.
  - `toggle_dashboard_privacy`: Toggles the user's dashboard privacy setting.


For more detailed information, please refer to [this](https://medium.com/@jaydipdey2807/week-1-3-at-circuitverse-google-summer-of-code-2024-9accce10639d) blog post

---

### Manage question moderators


In the fourth week, the focus was on enhancing the admin dashboard to allow admins to manage moderators who can create questions on the UI. A new button was added to the admin's dashboard to facilitate the addition and removal of moderators.

![add-moderator](/images/Jaydip_GSoC24/add_moderator_button.webp)

#### UI Changes

- **Dashboard Button:**
  - Added a new button to the admin's dashboard to manage moderators.
  - Modified the `app/views/users/circuitverse/index.html.erb` file:

    ```erb
    <% if current_user.admin? %>
      <button type="button" class="btn btn-secondary ml-0" data-toggle="modal" data-target="#addModeratorsModal"><%= t("users.circuitverse.index.add_moderator") %></button>
    <% end %>

    <%= render partial: "add_moderators_modal" %>
    ```

- **Modal for Managing Moderators:**
  - When the button is clicked, a modal opens where admins can enter email addresses of users to be added as moderators or remove existing moderators.

![manage-moderator-1](/images/Jaydip_GSoC24/manage_mod_1.webp)

#### Controller Functions

- **Add Moderators:**
  - The `add_moderators` function processes the email addresses entered by the admin and updates the `question_bank_moderator` field for the corresponding users.

    ```
    def add_moderators
      emails = params[:emails].split(',').map(&:strip)
      users = User.where(email: emails)
      
      users.each do |user|
        user.update(question_bank_moderator: true)
      end
      
      if users.all? { |user| user.errors.empty? }
        redirect_back(fallback_location: root_path)
      else
        render json: { errors: users.map(&:errors).flat_map(&:full_messages) }, status: :unprocessable_entity
      end
    end
    ```
- **Manage Moderators:**
  - The `manage_moderators` function lists current moderators and allows the admin to remove them by updating their `question_bank_moderator` field.

    ```
    def manage_moderators
      @moderators = User.where(question_bank_moderator: true)
      if params[:remove_moderator_id]
        moderator = User.find_by(id: params[:remove_moderator_id])
        if moderator.present?
          moderator.update(question_bank_moderator: false)
        else
          flash[:alert] = "Moderator not found."
        end
      end
    end
    ```

#### Modal Partial

- **Modal Structure:**
  - A modal to manage moderators was created, displaying current moderators and allowing the addition of new ones.

    ```
    <div id="addModeratorsModal" class="modal fade" role="dialog">
      <div class="modal-dialog primary-modal-dialog">
        <div class="modal-content">
          <div class="modal-header primary-modal-header">
            <h4 class="modal-title">Manage Moderators</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <p>Current Moderators:</p>
            <div id="moderators-list">
              <% if @moderators.present? %>
                <% @moderators.each do |moderator| %>
                  <div id="moderator-<%= moderator.id %>" class="badge badge-info badge-pill">
                    <%= moderator.email %>
                    <%= link_to "×", api_v1_remove_moderator_path(moderator.id), method: :delete, remote: true, class: "remove-moderator-btn", data: { id: moderator.id } %>
                  </div>
                <% end %>
              <% else %>
                <p>No moderators found.</p>
              <% end %>
            </div>

            <hr>

            <p>Add New Moderators:</p>
            <%= form_with(url: api_v1_users_add_moderators_path, method: :post, local: true) do |form| %>
              <div class="form-group d-flex flex-column">
                <%= form.label :emails, "Email Addresses" %>
                <%= form.text_area :emails, class: "form-control", id: "group_moderator_emails", rows: 3, placeholder: "Enter email addresses separated by commas" %>
              </div>
              <div class="modal-footer">
                <%= form.submit "Add Moderators", class: "btn primary-button", id: "add-moderator-button" %>
              </div>
            <% end %>
          </div>
        </div>
      </div>
    </div>
    ```

- **JavaScript for Modal:**
  - Script tag is added to handle the removal of moderators without a page refresh.
    ```
    <script>
      document.addEventListener("DOMContentLoaded", function() {
        document.querySelectorAll('.remove-moderator-btn').forEach(function(button) {
          button.addEventListener('ajax:success', function(event) {
            const moderatorId = this.dataset.id;
            const moderatorDiv = document.getElementById(`moderator-${moderatorId}`);
            if (moderatorDiv) {
              moderatorDiv.remove();
            }
          });
        });
      });
    </script>
    ```
![manage-moderator-2](/images/Jaydip_GSoC24/manage-mod-2.webp)

For more detailed information, please refer to [this](https://medium.com/@jaydipdey2807/week-4-at-circuitverse-google-summer-of-code-2024-a134f59f05f4) blog post

---

### Moderator Question Creation and Integration

During the fifth and sixth week, the focus was on enabling moderators to create questions through the UI and integrate these functionalities with the backend. A new option was added to the navbar for moderators and admins to access the question creation form.

#### UI Changes

- **Navbar Option for Adding Questions:**
  - Added a new option in the navbar visible only to moderators and admins:

    ```erb
    <% if user_signed_in? && current_user.question_bank_moderator %>
      <li class="nav-item px-1">
        <a class="nav-link navbar-item navbar-text" href="#" onclick="redirectToAddQuestion()"><%= t("layout.link_to_add_questions") %></a>
      </li>
    <% end %>
    ```
![add-question-nav](/images/Jaydip_GSoC24/add-q.webp)

- **Question Creation Form:**
  - When the "Add Question" button is clicked, a form to add questions is displayed.
  - The form includes fields for heading, statement (markdown editor), category, difficulty level, circuit boilerplate, and testbench data.
  - The path for the form is `/questions/new/:question_id`, where `question_id` is a unique string generated using the ShortUniqueID package.

![add-question-nav](/images/Jaydip_GSoC24/add-q-2.webp)

#### Markdown Editor Integration

- **SimpleMDE Markdown Editor:**
  - The statement input is converted into a markdown editor using [SimpleMDE](https://simplemde.com/)

#### Simulator Integration

- **Circuit Boilerplate and Test Data:**
  - A hyperlink "Create Circuit BoilerPlate and Test Data" redirects moderators to `/simulator?question_id=:qid` to create and save circuit data.

- **LocalStorage Handling:**
  - **Storing Progress:**
    - The question_id and other form values are stored in localStorage when the moderator navigates to the simulator page.
  - **Loading Progress:**
    - On the simulator page, if `question_id` is found in localStorage, the corresponding circuit data is loaded:

      ```
      const urlParams = new URLSearchParams(window.location.search);
      const questionId = urlParams.get('question_id');
      if (window.location.pathname.startsWith("/simulator") && questionId && localStorage.getItem(questionId)) {
          load(JSON.parse(localStorage.getItem(questionId)));
      }
      ```
  
 ![add-question-simulator](/images/Jaydip_GSoC24/add-q-sim.webp) 

  - **Saving Data:**
    - When the "Save" button on the simulator page is clicked, the circuit data is saved to localStorage

      ```
      document.getElementById('saveButton').addEventListener('click', () => {
          const urlParams = new URLSearchParams(window.location.search);
          const questionId = urlParams.get('question_id');
       
          if (questionId) {
              let fl = 1;
              const data = generateSaveData("Untitled", fl);
              const localStorageKey = `${questionId}`;
              localStorage.setItem(localStorageKey, data);
              alert("Circuit boilerplate and test data saved");
          } else {
              alert("Error: Something went wrong! Try again");
          }
      });
      ```
**Add question flowchart**
![add-question-flowchart](/images/Jaydip_GSoC24/add-q-flow.webp)

#### Dropdowns for Category and Difficulty Level

- **Category:**
  - Fetched from the database (e.g., logic gates, combinational circuit, sequential circuit).
- **Difficulty Level:**
  - Enum values (easy, medium, hard, expert).

**Add question preview**
{{< video src="/videos/Jaydip_GSoC24/Add-question.mov" type="video/mp4" preload="auto" >}}

For more detailed information, please refer to [this](https://medium.com/@jaydipdey2807/week-5-6-at-circuitverse-google-summer-of-code-2024-87ea6f738cb4) blog post

---


### Pull Request

Pull request for phase 1 can be found [here](https://github.com/CircuitVerse/CircuitVerse/pull/5015)


---

### Future Work

The tasks to be done include developing the UI for the moderators dashboard and integrating it with the backend to enable CRUD operations on questions. Next, efforts will focus on making the question practice page responsive across all screens, implementing filtering logic and backend integration, and setting up auto-verification and submission of questions. Additionally, a progressive dashboard for users will be created to display submission history and progress, followed by backend integration and addition of test cases. 