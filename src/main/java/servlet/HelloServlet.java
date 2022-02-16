package servlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.sql.*;

import static java.lang.invoke.VarHandle.AccessMode.SET;

@WebServlet(
        name = "MyServlet",
        urlPatterns = {"/hello"}
)
public class HelloServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        String username = req.getParameter("username");
//        System.out.println(username);

        try {
            Connection conn = DBconnect.dbConnect();
            Statement st = conn.createStatement();
            String q = "SELECT * FROM football_form WHERE username= ? ";
            PreparedStatement ps= conn.prepareStatement(q);
            ps.setString(1, username);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                Player p = new Player(rs.getString("username"), rs.getString("firstname"), rs.getString("lastname"),rs.getString("ccode"), rs.getString("phone"), rs.getString("email"), rs.getString("age_group"), rs.getString("team"), rs.getString("position"), rs.getString("address"), rs.getString("pin_code"), rs.getString("country"), rs.getString("states"), rs.getString("city"));
                Gson gson = new Gson();
                String etr = gson.toJson(p, Player.class);
                JsonObject jo = new JsonObject();
                jo.addProperty("message", "User not found");
                jo.addProperty("status", 200);
                resp.setStatus(200);
                resp.setContentType("application/json");
                PrintWriter pw = resp.getWriter();
                pw.print(etr);
                pw.flush();
            } else {
                JsonObject jo = new JsonObject();
                jo.addProperty("message", "User not found");
                jo.addProperty("status", 404);
                resp.setStatus(404);
                resp.setContentType("application/json");
                PrintWriter pw = resp.getWriter();
                pw.print(jo);
                pw.flush();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub

        StringBuilder sb = new StringBuilder();
        BufferedReader reader = request.getReader();
        try {
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line).append('\n');
            }
        } finally {
            reader.close();
        }
        System.out.println(sb.toString());

        String json_dta = request.getParameter("json");

        Gson gson = new Gson();
        Player player1 = gson.fromJson(sb.toString(), Player.class);

        //CONVERT PLAYER1 TO JSON
        String json = new Gson().toJson(player1);

//        System.out.println(json);

        Connection conn = DBconnect.dbConnect();
        try {
            if (conn != null) {
                DatabaseMetaData dm = (DatabaseMetaData) conn.getMetaData();
                System.out.println("Driver name: " + dm.getDriverName());
                System.out.println("Driver version: " + dm.getDriverVersion());
                System.out.println("Product name: " + dm.getDatabaseProductName());
                System.out.println("Product version: " + dm.getDatabaseProductVersion());

                Statement st = null;
                st = conn.createStatement();
                String q = "SELECT * FROM football_form WHERE username= ?" ;
                PreparedStatement pst= conn.prepareStatement(q);
                pst.setString(1,  player1.getUsername() );

                ResultSet rs = pst.executeQuery();
                if (!rs.next()) {
                    //insert a new row with new entries
                    String query = "INSERT INTO football_form (username,firstname,lastname,ccode,phone,email,age_group,team,position,address,pin_code,country,states,city) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                    PreparedStatement ps = conn.prepareStatement(query);
                    ps.setString(1 , player1.getUsername());
                    ps.setString(2,player1.getFirstname());
                    ps.setString(3,player1.getLastname());
                    ps.setString(4,player1.getccode());
                    ps.setString(5,player1.getPhone());
                    ps.setString(6,player1.getEmail());
                    ps.setString(7,player1.getAge_group());
                    ps.setString(8,player1.getTeam());
                    ps.setString(9,player1.getPosition());
                    ps.setString(10,player1.getAddress());
                    ps.setString(11,player1.getPin_code());
                    ps.setString(12,player1.getCountry());
                    ps.setString(13,player1.getStates());
                    ps.setString(14,player1.getCity());
                    ps.executeUpdate();

                    //message to show data is saved
                    JsonObject jo = new JsonObject();
                    jo.addProperty("message", "New user is successfully registered!!!");
                    jo.addProperty("status", 201);
                    response.setStatus(201);
                    response.setContentType("application/json");
                    PrintWriter pw = response.getWriter();
                    pw.print(jo);
                    pw.flush();
                } else {
                    //message for already registered user
                    JsonObject jo = new JsonObject();
                    jo.addProperty("message", "User already exists");
                    jo.addProperty("status", 409);
                    response.setStatus(409);
                    response.setContentType("application/json");
                    PrintWriter pw = response.getWriter();
                    pw.print(jo);
                    pw.flush();
                }
            }

        } catch (SQLException ex) {
            ex.printStackTrace();
        } finally {
            try {
                if (conn != null && !conn.isClosed()) {
                    conn.close();
                }
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        }
        response.getWriter().append("Served at: ").append(request.getContextPath());

    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        System.out.println("--put--");
        String username = req.getParameter("username");
        StringBuilder sb = new StringBuilder();
        BufferedReader reader = req.getReader();
        try {
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line).append('\n');
            }
        } finally {
            reader.close();
        }
        System.out.println(sb.toString());
//        String username = req.getParameter("username");
//        System.out.println(username);

        try {
            Gson gson = new Gson();
            Player player1 = gson.fromJson(sb.toString(), Player.class);
            Connection conn = DBconnect.dbConnect();
            String q = "SELECT * FROM football_form WHERE username= ?";
            assert conn != null;
            PreparedStatement ps1= conn.prepareStatement(q);
            ps1.setString(1, username);
            ResultSet rs = ps1.executeQuery();
            if (!rs.wasNull()) {

                String query = "UPDATE football_form SET firstname=?, lastname=?, ccode=?, phone=?, email=?, age_group=?, team=?, position=?, address=?, pin_code=?, country=?, states=?, city=? WHERE username = ?";
                PreparedStatement ps= conn.prepareStatement(query);
                ps.setString(1,player1.getFirstname());
                ps.setString(2,player1.getLastname());
                ps.setString(3,player1.getccode());
                ps.setString(4,player1.getPhone());
                ps.setString(5,player1.getEmail());
                ps.setString(6,player1.getAge_group());
                ps.setString(7,player1.getTeam());
                ps.setString(8,player1.getPosition());
                ps.setString(9,player1.getAddress());
                ps.setString(10,player1.getPin_code());
                ps.setString(11,player1.getCountry());
                ps.setString(12,player1.getStates());
                ps.setString(13,player1.getCity());
                ps.setString(14 , player1.getUsername());
                ps.executeUpdate();
                String etr = gson.toJson(player1, Player.class);
                resp.setContentType("application/json");
                PrintWriter pw = resp.getWriter();
                pw.print(etr);
                pw.flush();
            } else {
                JsonObject jo = new JsonObject();
                jo.addProperty("message", "User data has not been updated");
                jo.addProperty("status", 500);
                resp.setStatus(500);
                resp.setContentType("application/json");
                PrintWriter pw = resp.getWriter();
                pw.print(jo);
                pw.flush();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }


    }

}
