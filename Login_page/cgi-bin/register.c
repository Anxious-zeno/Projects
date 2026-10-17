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
    if (len > 255) len = 255; 
    
    char post_data[256] = {0};
    fread(post_data, 1, len, stdin);

    char user[100] = {0}, pass[100] = {0};
    if (sscanf(post_data, "username=%99[^&]&password=%99[^\r\n]", user, pass) != 2) {
        printf("<h2 style='color: red;'>Malformed request.</h2>");
        return 0;
    }

    printf("<html><head><title>Success</title></head><body style='font-family: sans-serif; text-align: center; margin-top: 50px;'>");
    
    FILE *fp = fopen("userdata.txt", "a");
    if (fp != NULL) {
        fprintf(fp, "%s %s\n", user, pass);
        fclose(fp);
        printf("<h2>Registration done, now log-in again to authenticate.</h2>");
    } else {
        printf("<h2 style='color: red;'>Server Error: Cannot write to userdata.txt. Check your cgi-bin directory permissions!</h2>");
    }

    printf("<br><br><a href='../index.html' style='padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;'>Go back to Login</a>");
    printf("</body></html>");
    
    return 0;
}