import {StyleSheet, Text, View, ScrollView, Switch} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ContentSettingExtended = () => {
  const [isEnabledFirst, setIsEnabledFirst] = useState(false);
  const [isEnabledSecond, setIsEnabledSecond] = useState(false);

  const [isEnabledThird, setIsEnabledThird] = useState(false);

  const toggleSwitch = () => setIsEnabledFirst(previousState => !previousState);
  const toggleSwitchSecond = () =>
    setIsEnabledSecond(previousState => !previousState);
  const toggleSwitchThird = () =>
    setIsEnabledThird(previousState => !previousState);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.listSetting}>
        <Text style={styles.headerlistSettings}>Tài khoản</Text>
        <View style={styles.listContent}>
          <Text style={styles.textlistContent}>Thiết lập xem trước mã QR</Text>
          <FontAwesome
            color="black"
            style={{paddingRight: 10}}
            name="angle-right"
            size={23}
          />
        </View>
        <View style={styles.listContent}>
          <Text style={styles.textlistContent}>
            Thiết lập tài khoản mặc định
          </Text>
          <FontAwesome
            color="black"
            style={{paddingRight: 10}}
            name="angle-right"
            size={23}
          />
        </View>
        <View style={styles.listContent}>
          <Text style={styles.textlistContent}>Thay đổi gói dịch vụ</Text>
          <FontAwesome
            color="black"
            style={{paddingRight: 10}}
            name="angle-right"
            size={23}
          />
        </View>
        <View style={styles.listContent}>
          <Text style={styles.textlistContent}>Khóa tài khoản VPBank NEO</Text>
          <FontAwesome
            color="black"
            style={{paddingRight: 10}}
            name="angle-right"
            size={23}
          />
        </View>
      </View>
      <View style={styles.listSetting}>
        <Text style={styles.headerlistSettings}>Bảo mật</Text>
        <View style={styles.listContent}>
          <Text style={styles.textlistContent}>Đăng nhập vân tay</Text>
          <View style={styles.switchContainer}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabledFirst ? 'white' : 'white'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabledFirst}
              style={styles.switch}
            />
          </View>
        </View>
        <View style={styles.listContent}>
          <Text style={styles.textlistContent}>Mã PIN</Text>
          <View style={styles.switchContainer}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabledSecond ? 'white' : 'white'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchSecond}
              value={isEnabledSecond}
              style={styles.switch}
            />
          </View>
        </View>
        <View style={styles.listContent}>
          <Text style={styles.textlistContent}>Đổi mã PIN</Text>
          <FontAwesome
            color="black"
            style={{paddingRight: 10}}
            name="angle-right"
            size={23}
          />
        </View>
        <View style={styles.listContent}>
          <Text style={styles.textlistContent}>Đổi mật khẩu</Text>
          <FontAwesome
            color="black"
            style={{paddingRight: 10}}
            name="angle-right"
            size={23}
          />
        </View>
        <View style={styles.listContent}>
          <View style={styles.textlistContentContainer}>
            <Text style={styles.textlistContentOther}>
              Phương thức nhận OTP
            </Text>
            <Text style={styles.textlistContentDescOther}>
              Smart OTP (Smart OTP)
            </Text>
          </View>
          <FontAwesome
            color="black"
            style={{paddingRight: 10}}
            name="angle-right"
            size={23}
          />
        </View>
        <View style={styles.listContent}>
          <View style={styles.textlistContentContainer}>
            <Text style={styles.textlistContentOther}>Xác thực khuôn mặt</Text>
            <Text style={styles.textlistContentDescOther}>
              Giúp tăng cường bảo mật cho tài khoản VPBank NEO
            </Text>
          </View>
          <FontAwesome
            color="black"
            style={{paddingRight: 10}}
            name="angle-right"
            size={23}
          />
        </View>
        <View style={styles.listContent}>
          <Text style={styles.textlistContentOther}>Quản lý thiết bị</Text>
          <FontAwesome
            color="black"
            style={{paddingRight: 10}}
            name="angle-right"
            size={23}
          />
        </View>
      </View>
      <View style={styles.listSetting}>
        <Text style={styles.headerlistSettings}>Thông báo</Text>

        <View style={styles.listContent}>
          <Text style={styles.textlistContent}>Thiết lập biến động số dư</Text>
          <FontAwesome
            color="black"
            style={{paddingRight: 10}}
            name="angle-right"
            size={23}
          />
        </View>
        <View style={styles.listContent}>
          <View style={styles.textlistContentContainer}>
            <Text style={styles.textlistContentOther}>
              Chia sẻ biến động số dư
            </Text>
            <Text style={styles.textlistContentDescOther}>
              0 mã chia sẻ đang hoạt động
            </Text>
          </View>
          <FontAwesome
            color="black"
            style={{paddingRight: 10}}
            name="angle-right"
            size={23}
          />
        </View>
        <View style={styles.listContent}>
          <View style={styles.textlistContentContainer}>
            <Text style={styles.textlistContentOther}>
              Xem trước thông báo biến động số dư
            </Text>
            <Text style={styles.textlistContentDesc}>
              Khi tính năng được bật, Quý khách xem được thông báo biến động số
              dư ngoài màn hình đăng nhập
            </Text>
            <Text style={styles.textlistContentWarning}>
              Lưu ý : rủi ro lộ thông tin giao dịch cá nhân
            </Text>
          </View>
          <View style={styles.switchContainerFinal}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabledThird ? 'white' : 'white'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchThird}
              value={isEnabledThird}
              style={styles.switch}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ContentSettingExtended;

const styles = StyleSheet.create({
  container: {
    flex: 9,
    backgroundColor: '#f3f7f8',
    paddingVertical: 10,
  },
  headerlistSettings: {
    paddingHorizontal: 10,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    paddingVertical: 10,
  },
  listContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 13,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  textlistContent: {
    color: 'black',
    fontSize: 14.5,
    fontWeight: '400',
  },
  textlistContentDesc: {
    paddingVertical: 10,
    color: 'gray',
    // paddingRight: -100,
  },
  textlistContentWarning: {
    color: 'red',
  },

  textlistContentDescOther: {
    paddingVertical: 5,
    color: 'gray',
  },
  textlistContentOther: {
    color: 'black',
    fontSize: 14.5,
    fontWeight: '500',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  switch: {
    alignSelf: 'flex-end',
  },
  textlistContentContainer: {
    width: '70%',
  },
  switchContainerFinal: {
    width: '30%',
  },
});
