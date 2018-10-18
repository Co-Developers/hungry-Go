package com.food.dao;

import java.awt.BorderLayout;
import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.Statement;
import java.util.LinkedList;
import java.util.List;
import java.util.Properties;

import org.springframework.stereotype.Repository;

import com.food.models.Item;

@Repository
public class ItemDaoImpl implements ItemDao{

	@Override
	public List<Item> findAllItems() {
		Connection conn = null;
		Statement st = null;
		ResultSet rs = null;
		List<Item> tempItem = new LinkedList<Item>();
		try {

			Properties props = new Properties();
			FileInputStream in = new FileInputStream("db.properties");
			props.load(in);
			in.close();
			String driver = props.getProperty("jdbc.driver");
			String myUrl = props.getProperty("jdbc.url");
			String username = props.getProperty("jdbc.username");
			String password = props.getProperty("jdbc.password");
			conn = DriverManager.getConnection(myUrl, username, password);
			
			try {
				st = conn.createStatement();
				rs = st.executeQuery("select * from menu" );
				while (rs.next()) {
					  int i = rs.getInt("id");
					  String title = rs.getString("title");
					  String link = rs.getString("link");
					  int price = rs.getInt("price");
					  Item item = new Item(i,title,link,price);

					  tempItem.add(item);
					}
				   return tempItem;
				}
				catch(Exception e)
				{
					System.out.println("error1");
				}
	}
		catch(Exception e)
		{
			System.out.println("error2"+e.getMessage());
		}
		return null;
	}
}
