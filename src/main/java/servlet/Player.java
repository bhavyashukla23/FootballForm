package servlet;

public class Player {

    private String username;
    private String firstname;
    private String lastname;
    private String ccode;
    private String phone;
    private String email;
    private String age_group;
    private String team;
    private String position;
    private String address;
    private String pin_code;
    private String country;
    private String states;
    private String city;

//empty default constructor
    public Player() {
    }

    //Parameterised constructor
    public Player(String username, String firstname, String lastname,String ccode, String phone, String email, String age_group, String team, String position, String address,
                  String pin_code, String country, String states, String city) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.ccode=ccode;
        this.phone = phone;
        this.email = email;
        this.age_group = age_group;
        this.team = team;
        this.position = position;
        this.address = address;
        this.pin_code = pin_code;
        this.country = country;
        this.states = states;
        this.city = city;
    }



    // getters and setters, equals(), toString() .... (omitted for brevity)

    public void setCcode(String ccode) {
        this.ccode = ccode;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }
    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAge_group() {
        return age_group;
    }

    public void setAge_group(String age_group) {
        this.age_group = age_group;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPin_code() {
        return pin_code;
    }

    public void setPin_code(String pin_code) {
        this.pin_code = pin_code;
    }

    public String getCountry() {
        return country;
    }
    public void setCountry(String country) {
        this.country = country;
    }

    public String getStates() {
        return states;
    }

    public void setStates(String state) {
        this.states = states;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getccode() {
        return ccode;
    }

//    public String getpcode() {
//    }
}

