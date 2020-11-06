from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Firefox()
wait = WebDriverWait(driver, 2)

try:
    driver.get("http://localhost:3000")
    wait.until(EC.title_contains('Project Icarus'))

    # Start game
    driver.find_element_by_class_name('btn').click()
    wait.until(EC.presence_of_element_located((By.TAG_NAME, 'input')))

    # Enter name and click start
    driver.find_element_by_tag_name('input').send_keys('user0')
    driver.find_element_by_id('button-start').click()
    wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'btn-success')))

    # Set up other players
    for i in range(1,5):
        # Open new tab
        url = driver.current_url
        driver.execute_script("window.open('" + url + "');")
        driver.switch_to_window(driver.window_handles[i])
        wait.until(EC.presence_of_element_located((By.TAG_NAME, 'input')))
        driver.find_element_by_tag_name('input').send_keys('user' + str(i))
        driver.find_element_by_id('button-start').click()
        wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'btn-success')))

finally:
    print('test')
    # driver.quit()