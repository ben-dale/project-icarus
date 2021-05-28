from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Firefox()
driver.set_window_position(0, 0)
driver.set_window_size(1024, 2000)
wait = WebDriverWait(driver, 2)

# Simulate a good only voting game
try:
    roles = []
    current_leader = 0
    assassin = 0
    merlin = 0
    players_required_per_round = [2, 3, 2, 3, 3]

    driver.get("http://localhost:8080")
    wait.until(EC.title_contains('Project Icarus'))

    # Start game
    driver.find_element_by_class_name('btn').click()
    wait.until(EC.presence_of_element_located((By.TAG_NAME, 'input')))

    # Enter name and click start
    driver.find_element_by_tag_name('input').send_keys('user0')
    driver.find_element_by_id('button-start').click()
    wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'btn-success')))
    driver.find_elements_by_class_name('btn-success')[0].click()

    # Set up other players in new tabs
    for i in range(1, 5):
        url = driver.current_url
        driver.execute_script("window.open('" + url + "');")
        driver.switch_to.window(driver.window_handles[i])
        wait.until(EC.presence_of_element_located((By.TAG_NAME, 'input')))
        driver.find_element_by_tag_name('input').send_keys('user' + str(i))
        driver.find_element_by_id('button-start').click()
        wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'btn-success')))
        driver.find_elements_by_class_name('btn-success')[0].click()

    # Find role for each user and assert
    for i in range (0, 5):
        driver.switch_to.window(driver.window_handles[i])
        
        if 'sim-role-good' in driver.find_element_by_class_name('sim-role').get_attribute('class'):
            roles.append('GOOD')

        if 'sim-role-bad' in driver.find_element_by_class_name('sim-role').get_attribute('class'):
            roles.append('BAD')

        if 'Merlin' in driver.find_element_by_class_name('sim-role').text:
            merlin = i
        
        if 'Assassin' in driver.find_element_by_class_name('sim-role').text:
            assassin = i

    # TODO - assert roles, merlin, assassin etc.
    assert roles.count('GOOD') == 3
    assert roles.count('BAD') == 2
    assert len(roles) == 5

    # Start game
    for i in range (0, 5):
        driver.switch_to.window(driver.window_handles[i])
        driver.find_element_by_class_name('sim-ready-button').click()

    # For three rounds...
    for j in range (0, 3):
        # Find current leader
        for i in range (0, 5):
            driver.switch_to.window(driver.window_handles[i])
            if driver.find_element_by_class_name('sim-ready-button').get_attribute('disabled') is not None:
                current_leader = i

        # Setup quest proposal
        driver.switch_to.window(driver.window_handles[current_leader])
        for i in range (0, players_required_per_round[j]):
            driver.find_element_by_class_name('sim-select-player-button-' + str(i)).click()

        # Start quest proposal vote
        for i in range (0, 5):
            driver.switch_to.window(driver.window_handles[i])
            driver.find_element_by_class_name('sim-ready-button').click()

        # Approve quest proposal
        for i in range (0, 5):
            driver.switch_to.window(driver.window_handles[i])
            driver.find_element_by_class_name('sim-approve-button').click()
            driver.find_element_by_class_name('sim-ready-button').click()

        # Start quest
        for i in range (0, 5):
            driver.switch_to.window(driver.window_handles[i])
            driver.find_element_by_class_name('sim-ready-button').click()

        # Players on quest vote to succeed
        for i in range (0, players_required_per_round[j]):
            driver.switch_to.window(driver.window_handles[i])
            driver.find_element_by_class_name('sim-succeed-button').click()

        # Start results reveal
        for i in range (0, 5):
            driver.switch_to.window(driver.window_handles[i])
            driver.find_element_by_class_name('sim-ready-button').click()

        # Leader reveal results
        driver.switch_to.window(driver.window_handles[current_leader])
        for i in range (0, players_required_per_round[j]):
            driver.find_element_by_class_name('sim-reveal-button-' + str(i)).click()
        
        # Start next round
        for i in range (0, 5):
            driver.switch_to.window(driver.window_handles[i])
            driver.find_element_by_class_name('sim-ready-button').click()

    # Switch to assassin and nominate player (not merlin)
    driver.switch_to.window(driver.window_handles[assassin])
    goodPlayer0 = driver.find_element_by_class_name('sim-select-player-button-0')
    goodPlayer1 = driver.find_element_by_class_name('sim-select-player-button-1')
    goodPlayer2 = driver.find_element_by_class_name('sim-select-player-button-2')
    if goodPlayer0.text == 'User' + str(merlin):
        goodPlayer0.click()
    elif goodPlayer1.text == 'User' + str(merlin):
        goodPlayer1.click()
    else:
        goodPlayer2.click()

    # Show final result
    for i in range (0, 5):
        driver.switch_to.window(driver.window_handles[i])
        driver.find_element_by_class_name('sim-ready-button').click()
    
    # Assert final screen contents
    for i in range (0, 5):
        driver.switch_to.window(driver.window_handles[i])
        final_text = driver.find_element_by_class_name('card-title').text
        assert final_text == 'Evil has taken the win!'

    # Start new game
    for i in range (0, 5):
        driver.switch_to.window(driver.window_handles[i])
        driver.find_element_by_class_name('sim-outcome-button').click()

finally:
    # print("done")
    driver.quit()    