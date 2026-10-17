#include <stdio.h>
#include <stdlib.h>

int main(void) {
    printf("Content-Type: text/html\n\n");
    
    char *len_str = getenv("CONTENT_LENGTH");
    
    if (len_str == NULL) {
        printf("<h2>Error: No data received.</h2>");
        return 1;
    }

    int len = atoi(len_str);
    char *post_data = malloc(len + 1);
    
    if (post_data == NULL) {
        printf("<h2>Memory allocation error.</h2>");
        return 1;
    }

    fread(post_data, 1, len, stdin);
    post_data[len] = '\0'; // Null-terminate

    FILE *file = fopen("userdata.txt", "a");
    if (file != NULL) {
        fprintf(file, "New Submission: %s\n", post_data);
        fclose(file);
        
        // Output a success message to the browser
        printf("<h2>Success! Data saved to userdata.txt locally.</h2>");
        printf("<a href='/index.html'>Go back to login page</a>");
    } else {
        printf("<h2>Error: Could not open file to save data.</h2>");
    }

    free(post_data);
    return 0;
}