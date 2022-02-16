package servlet;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBconnect {
    public static Connection dbConnect(){
        try{
            String dbURL = "jdbc:sqlserver://localhost:1433;databaseName=football_form;ssl=require";
            String user = "sa";
            String pass = "Bshukla@123";
            return DriverManager.getConnection(dbURL, user, pass);

        }
        catch (
                SQLException ex) {
            ex.printStackTrace();
        }
        return  null;
    }


}
