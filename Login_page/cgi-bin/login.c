#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    char *lenstr = getenv("CONTENT_LENGTH");
    
    printf("Content-Type: text/html\n\n");
    
    if (lenstr == NULL) {
        printf("<h2>Error: Form must be submitted via POST.</h2>");
        return 0;
    }
    
    long len = strtol(lenstr, NULL, 10);
    if (len > 255) len = 255; // Clamp length to prevent buffer overflow
    
    char post_data[256] = {0};
    fread(post_data, 1, len, stdin); // Use fread for raw POST data

    char input_user[100] = {0}, input_pass[100] = {0};
    
    if (sscanf(post_data, "username=%99[^&]&password=%99[^\r\n]", input_user, input_pass) != 2) {
        printf("<h2 style='color: red;'>Malformed request.</h2>");
        return 0;
    }

    FILE *fp = fopen("userdata.txt", "r");
    int auth_success = 0;
    
    if (fp != NULL) {
        char stored_user[100] = {0}, stored_pass[100] = {0};
        while (fscanf(fp, "%99s %99s", stored_user, stored_pass) == 2) {
            if (strcmp(input_user, stored_user) == 0 && strcmp(input_pass, stored_pass) == 0) {
                auth_success = 1;
                break;
            }
        }
        fclose(fp);
    }

    printf("<html><head><title>Dashboard</title></head><body style='font-family: sans-serif; text-align: center; margin-top: 50px;'>");
    if (auth_success) {
        printf("<h2>Rest is under-construction</h2>");
    } else {
        printf("<h2 style='color: red;'>Invalid Credentials. Try again.</h2>");
        printf("<a href='../index.html' style='padding: 10px 20px; background: #333; color: white; text-decoration: none; border-radius: 5px;'>Go back</a>");
    }
    printf("</body></html>");
    
    return 0;
}