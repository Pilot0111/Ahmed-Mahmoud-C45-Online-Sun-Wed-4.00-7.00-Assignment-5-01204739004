
// Bonus (2 Grades)
// How to deliver the bonus?
// 1- Solve the problem Customer Who Visited but Did Not Make Any Transactions on LeetCode
// 2- Inside your assignment folder, create a SEPARATE FILE and name it “bonus.txt”
// 3- Copy the code that you have submitted on the website inside ”bonus.txt” file




SELECT customer_id, COUNT(*) AS count_no_trans 
FROM 
( SELECT Visits.* FROM Visits WHERE Visits.visit_id NOT IN
( SELECT Visits.visit_id FROM Visits INNER JOIN Transactions WHERE Visits.visit_id = Transactions.visit_id 
GROUP BY Visits.visit_id)) 
AS count_no_trans GROUP BY customer_id